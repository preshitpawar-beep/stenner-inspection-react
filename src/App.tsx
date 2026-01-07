import { useState } from "react";
import PinLock from "./pages/PinLock";
import Home from "./pages/Home";

export default function App() {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem("pinUnlocked") === "true";
  });

  const handleUnlock = () => {
    sessionStorage.setItem("pinUnlocked", "true");
    setUnlocked(true);
  };

  if (!unlocked) {
    return <PinLock onUnlock={handleUnlock} />;
  }

  return <Home />;
}
