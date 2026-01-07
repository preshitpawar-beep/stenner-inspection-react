import { useEffect, useState } from "react";
import { ST100R_TEMPLATE } from "../templates/st100r";

interface InspectionProps {
  machineType: string;
}

export default function Inspection({ machineType }: InspectionProps) {
  const [template, setTemplate] = useState<any>(null);

  useEffect(() => {
    if (machineType === "ST100R") {
      setTemplate(ST100R_TEMPLATE);
    }
  }, [machineType]);

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
          This is a scaffold inspection form. Full checklist will plug in here.
        </p>
      </div>

      {template.sections.map((section: any) => (
        <div key={section.title} className="card">
          <h3>{section.title}</h3>

          {section.fields.map((field: any) => (
            <div key={field.key} className="mt-2">
              <label>{field.label}</label>

              {field.type === "text" && <input type="text" />}

              {field.type === "checkbox" && (
                <input type="checkbox" style={{ width: "auto" }} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
