import { useEffect, useState } from "react";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ST100R_TEMPLATE } from "../templates/st100r";

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
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    saveInspection(updated);
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
          Status: <strong>{status.toUpperCase()}</strong>
        </p>
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
                  value={answers[field.key] || ""}
                  onChange={(e) =>
                    updateAnswer(field.key, e.target.value)
                  }
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  value={answers[field.key] || ""}
                  onChange={(e) =>
                    updateAnswer(field.key, e.target.value)
                  }
                />
              )}

              {field.type === "checkbox" && (
                <input
                  type="checkbox"
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
