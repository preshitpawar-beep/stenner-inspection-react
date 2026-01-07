import { useEffect, useState } from "react";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ST100R_TEMPLATE } from "../templates/st100r";

const COMPLETE_PASSWORD = "Stenner@Complete";

interface InspectionProps {
  machineId: string;
  machineType: string;
}

export default function Inspection({ machineId, machineType }: InspectionProps) {
  const [template, setTemplate] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<"draft" | "completed">("draft");

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
    }
  };

  const saveInspection = async (updatedAnswers: Record<string, any>) => {
    await setDoc(
      inspectionRef,
      {
        machineType,
        answers: updatedAnswers,
        status,
        updatedOn: Timestamp.now()
      },
      { merge: true }
    );
  };

  const updateAnswer = (key: string, value: any) => {
    if (status === "completed") return;

    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    saveInspection(updated);
  };

  const completeInspection = async () => {
    const pwd = prompt("Enter password to complete inspection:");
    if (pwd !== COMPLETE_PASSWORD) {
      alert("Incorrect password");
      return;
    }

    setStatus("completed");
    await setDoc(
      inspectionRef,
      {
        status: "completed",
        completedOn: Timestamp.now()
      },
      { merge: true }
    );
  };

  const reopenInspection = async () => {
    const pwd = prompt("Enter password to reopen inspection:");
    if (pwd !== COMPLETE_PASSWORD) {
      alert("Incorrect password");
      return;
    }

    setStatus("draft");
    await setDoc(
      inspectionRef,
      {
        status: "draft",
        reopenedOn: Timestamp.now()
      },
      { merge: true }
    );
  };

  if (!template) {
    return (
      <div className="container">
        <p>No inspection template found.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{template.title}</h2>

        <p className="text-muted">
          Status:{" "}
          <strong
            style={{
              color: status === "completed" ? "#16a34a" : "#d97706"
            }}
          >
            {status.toUpperCase()}
          </strong>
        </p>

        {status === "draft" && (
          <button className="mt-2" onClick={completeInspection}>
            Complete Inspection
          </button>
        )}

        {status === "completed" && (
          <button className="mt-2" onClick={reopenInspection}>
            Reopen Inspection
          </button>
        )}
      </div>

      {template.sections.map((section: any) => (
        <div key={section.title} className="card">
          <h3>{section.title}</h3>

          {section.fields.map((field: any) => (
            <div key={field.key} className="mt-2">
              <label>{field.label}</label>

              {field.type === "text" && (
                <input
                  type="text"
                  disabled={status === "completed"}
                  value={answers[field.key] || ""}
                  onChange={(e) =>
                    updateAnswer(field.key, e.target.value)
                  }
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  disabled={status === "completed"}
                  value={answers[field.key] || ""}
                  onChange={(e) =>
                    updateAnswer(field.key, e.target.value)
                  }
                />
              )}

              {field.type === "checkbox" && (
                <input
                  type="checkbox"
                  disabled={status === "completed"}
                  checked={answers[field.key] || false}
                  onChange={(e) =>
                    updateAnswer(field.key, e.target.checked)
                  }
                  style={{ width: "auto" }}
                />
              )}

              {field.type === "group" &&
                field.parts.map((part: any) => {
                  const compoundKey = `${field.key}.${part.sub}`;
                  return (
                    <div key={compoundKey} className="mt-2">
                      <label>{part.label}</label>

                      {part.type === "text" && (
                        <input
                          type="text"
                          disabled={status === "completed"}
                          value={answers[compoundKey] || ""}
                          onChange={(e) =>
                            updateAnswer(
                              compoundKey,
                              e.target.value
                            )
                          }
                        />
                      )}

                      {part.type === "number" && (
                        <input
                          type="number"
                          disabled={status === "completed"}
                          value={answers[compoundKey] || ""}
                          onChange={(e) =>
                            updateAnswer(
                              compoundKey,
                              e.target.value
                            )
                          }
                        />
                      )}

                      {part.type === "checkbox" && (
                        <input
                          type="checkbox"
                          disabled={status === "completed"}
                          checked={answers[compoundKey] || false}
                          onChange={(e) =>
                            updateAnswer(
                              compoundKey,
                              e.target.checked
                            )
                          }
                          style={{ width: "auto" }}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
