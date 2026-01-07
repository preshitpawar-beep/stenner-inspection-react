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
}

export default function Machine({ machineId }: MachineProps) {
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
        <p className="text-muted">
          Inspection sheets will appear here (ST100R for now).
        </p>
      </div>
    </div>
  );
}
