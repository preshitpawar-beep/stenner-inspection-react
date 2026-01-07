import { useState } from "react";
import PinLock from "./pages/PinLock";
import Home from "./pages/Home";
import Machine from "./pages/Machine";
import Inspection from "./pages/Inspection";

type View =
  | { name: "home" }
  | { name: "machine"; machineId: string; machineType: string }
  | {
      name: "inspection";
      machineId: string;
      machineType: string;
    };

export default function App() {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem("pinUnlocked") === "true";
  });

  const [view, setView] = useState<View>({ name: "home" });

  const handleUnlock = () => {
    sessionStorage.setItem("pinUnlocked", "true");
    setUnlocked(true);
  };

  if (!unlocked) {
    return <PinLock onUnlock={handleUnlock} />;
  }

  if (view.name === "home") {
    return (
      <Home
        onOpenMachine={(machineId, machineType) =>
          setView({ name: "machine", machineId, machineType })
        }
      />
    );
  }

  if (view.name === "machine") {
    return (
      <Machine
        machineId={view.machineId}
        machineType={view.machineType}
        onBack={() => setView({ name: "home" })}
        onOpenInspection={() =>
          setView({
            name: "inspection",
            machineId: view.machineId,
            machineType: view.machineType
          })
        }
      />
    );
  }

  if (view.name === "inspection") {
    return (
      <Inspection
        machineId={view.machineId}
        machineType={view.machineType}
        onBack={() =>
          setView({
            name: "machine",
            machineId: view.machineId,
            machineType: view.machineType
          })
        }
      />
    );
  }

  return null;
}
