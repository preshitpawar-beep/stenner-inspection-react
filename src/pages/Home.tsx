import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const ADD_MACHINE_PASSWORD = "Stenner@123";

interface Machine {
  id: string;
  type: string;
  serial: string;
  createdOn: Date;
}

export default function Home() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [type, setType] = useState("");
  const [serial, setSerial] = useState("");

  useEffect(() => {
    loadMachines();
  }, []);

  const loadMachines = async () => {
    const snap = await getDocs(collection(db, "machines"));
    const list: Machine[] = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        type: data.type,
        serial: data.serial,
        createdOn: data.createdOn?.toDate?.() || new Date()
      };
    });
    setMachines(list);
  };

  const addMachine = async () => {
    const pwd = prompt("Enter password to add machine:");
    if (pwd !== ADD_MACHINE_PASSWORD) {
      alert("Incorrect password");
      return;
    }

    if (!type) {
      alert("Please enter machine type");
      return;
    }

    await addDoc(collection(db, "machines"), {
      type,
      serial,
      createdOn: Timestamp.now()
    });

    setType("");
    setSerial("");
    loadMachines();
  };

  return (
    <>
      <div className="header">
        <h1>Stenner Inspection App</h1>
      </div>

      <div className="container">
        <div className="card">
          <h3>Add Machine</h3>

          <label>Machine Type</label>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g. ST100R"
          />

          <label className="mt-2">Serial Number</label>
          <input
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            placeholder="Optional"
          />

          <button className="mt-3" onClick={addMachine}>
            Add Machine
          </button>
        </div>

        <div className="card">
          <h3>Machines</h3>

          {machines.length === 0 && (
            <p className="text-muted">No machines added yet.</p>
          )}

          {machines.map((m) => (
            <div key={m.id} className="card">
              <strong>
                {m.type} {m.serial && `- ${m.serial}`}
              </strong>
              <div className="text-muted">
                Created: {m.createdOn.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
