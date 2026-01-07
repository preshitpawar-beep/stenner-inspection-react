import { useEffect, useRef, useState } from "react";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { ST100R_TEMPLATE } from "../templates/st100r";

const COMPLETE_PASSWORD = "Stenner@Complete";

interface InspectionProps {
  machineId: string;
  machineType: string;
  onBack?: () => void;
}

export default function Inspection({
  machineId,
  machineType,
  onBack
}: InspectionProps) {
  const [template, setTemplate] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<"draft" | "completed">("draft");
  const [photos, setPhotos] = useState<string[]>([]);
  const [typedSignature, setTypedSignature] = useState("");
  const [drawnSignatureUrl, setDrawnSignatureUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  const inspectionRef = doc(
    db,
    "machines",
    machineId,
    "inspections",
    machineType
  );

  useEffect(() => {
    if (machineType === "ST100R") {
      setTemplate(ST100R_TEMPLATE);
    }
    loadInspection();
    // eslint-disable-next-line
  }, [machineId, machineType]);

  const loadInspection = async () => {
    const snap = await getDoc(inspectionRef);
    if (snap.exists()) {
      const data = snap.data();
      setAnswers(data.answers || {});
      setStatus(data.status || "draft");
      setPhotos(data.photos || []);
      setTypedSignature(data.typedSignature || "");
      setDrawnSignatureUrl(data.drawnSignatureUrl || null);
    }
  };

  const saveInspection = async (extra: any = {}) => {
    await setDoc(
      inspectionRef,
      {
        machineType,
        answers,
        status,
        photos,
        typedSignature,
        drawnSignatureUrl,
        updatedOn: Timestamp.now(),
        ...extra
      },
      { merge: true }
    );
  };

  const updateAnswer = (key: string, value: any) => {
    if (status === "completed") return;
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    setDoc(
      inspectionRef,
      { answers: updated, updatedOn: Timestamp.now() },
      { merge: true }
    );
  };

  /* -------------------- PHOTO UPLOAD -------------------- */
  const uploadPhoto = async (file: File) => {
    setUploading(true);
    const fileRef = ref(
      storage,
      `machines/${machineId}/inspections/${machineType}/photos/${Date.now()}_${file.name}`
    );
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    const updatedPhotos = [...photos, url];
    setPhotos(updatedPhotos);
    await setDoc(
      inspectionRef,
      { photos: updatedPhotos, updatedOn: Timestamp.now() },
      { merge: true }
    );
    setUploading(false);
  };

  /* -------------------- SIGNATURE (DRAW) -------------------- */
  const startDraw = (e: any) => {
    if (status === "completed") return;
    drawing.current = true;
    draw(e);
  };

  const endDraw = () => {
    drawing.current = false;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const draw = (e: any) => {
    if (!drawing.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearSignature = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 400, 150);
  };

  const saveDrawnSignature = async () => {
    if (!canvasRef.current) return;
    setUploading(true);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvasRef.current!.toBlob(resolve)
    );
    if (!blob) return;

    const sigRef = ref(
      storage,
      `machines/${machineId}/inspections/${machineType}/signature.png`
    );

    await uploadBytes(sigRef, blob);
    const url = await getDownloadURL(sigRef);
    setDrawnSignatureUrl(url);

    await setDoc(
      inspectionRef,
      { drawnSignatureUrl: url, updatedOn: Timestamp.now() },
      { merge: true }
    );

    setUploading(false);
  };

  /* -------------------- COMPLETE / REOPEN -------------------- */
  const completeInspection = async () => {
    const pwd = prompt("Enter password to complete inspection:");
    if (pwd !== COMPLETE_PASSWORD) return alert("Incorrect password");
    setStatus("completed");
    await saveInspection({ status: "completed", completedOn: Timestamp.now() });
  };

  const reopenInspection = async () => {
    const pwd = prompt("Enter password to reopen inspection:");
    if (pwd !== COMPLETE_PASSWORD) return alert("Incorrect password");
    setStatus("draft");
    await saveInspection({ status: "draft", reopenedOn: Timestamp.now() });
  };

  if (!template) return <div className="container">Loading…</div>;

  return (
    <div className="container">
      {onBack && (
        <button className="mb-2" onClick={onBack}>
          ← Back
        </button>
      )}

      <div className="card">
        <h2>{template.title}</h2>
        <p className="text-muted">
          Status: <strong>{status.toUpperCase()}</strong>
        </p>

        {status === "draft" ? (
          <button onClick={completeInspection}>Complete Inspection</button>
        ) : (
          <button onClick={reopenInspection}>Reopen Inspection</button>
        )}
      </div>

      {/* SIGNATURES */}
      <div className="card">
        <h3>Signatures</h3>

        <label>Typed Signature (Name)</label>
        <input
          type="text"
          disabled={status === "completed"}
          value={typedSignature}
          onChange={(e) => {
            setTypedSignature(e.target.value);
            saveInspection({ typedSignature: e.target.value });
          }}
        />

        <label className="mt-2">Drawn Signature</label>

        {drawnSignatureUrl && (
          <img
            src={drawnSignatureUrl}
            alt="Signature"
            style={{ maxWidth: 300, display: "block", marginBottom: 8 }}
          />
        )}

        {status === "draft" && (
          <>
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              style={{ border: "1px solid #ccc" }}
              onMouseDown={startDraw}
              onMouseUp={endDraw}
              onMouseMove={draw}
              onTouchStart={startDraw}
              onTouchEnd={endDraw}
              onTouchMove={draw}
            />
            <div className="mt-2">
              <button onClick={clearSignature}>Clear</button>{" "}
              <button onClick={saveDrawnSignature} disabled={uploading}>
                Save Signature
              </button>
            </div>
          </>
        )}
      </div>

      {/* PHOTOS */}
      <div className="card">
        <h3>Inspection Photos</h3>
        {status === "draft" && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && uploadPhoto(e.target.files[0])
            }
          />
        )}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {photos.map((p, i) => (
            <img key={i} src={p} style={{ width: 100 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
