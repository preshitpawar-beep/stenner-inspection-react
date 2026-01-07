import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Machine {
  id: string;
  type: string;
  serial: string;
  createdOn: Date;
}

interface MachineProps {
  machineId: string;
  machineType: string;
  onBack: () => void;
  onOpenInspection: () => void;
}

export default function Machine({
  machineId,
  machineType,
  onBack,
  onOpenInspection
}: MachineProps) {
  const [machine, setMachine] = useState<Machine | null>(null);

  useEffect(() => {
    loadMachine();
  }, [machineId]);

  const loadMachine = async () => {
    const ref = doc(db, "machines", machineId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const data = snap.data();
    setMachine({
      id: snap.id,
      type: data.type,
      serial: data.serial,
      createdOn: data.createdOn?.toDate?.() || new Date()
    });
  };

  if (!machine) {
    return (
      <div className="container">
        <p>Loading machine...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="mb-2" onClick={onBack}>
        ← Back
      </button>

      <div className="card">
        <h2>
          {machine.type} {machine.serial && `- ${machine.serial}`}
        </h2>
        <p className="text-muted">
          Created: {machine.createdOn.toLocaleString()}
        </p>
      </div>

      <div className="card">
        <h3>Inspections</h3>

        <button onClick={onOpenInspection}>
          Open {machineType} Inspection
        </button>
      </div>
    </div>
  );
}
