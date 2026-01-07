import { useState } from "react";

const CORRECT_PIN = "1875";

interface PinLockProps {
  onUnlock: () => void;
}

export default function PinLock({ onUnlock }: PinLockProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (pin === CORRECT_PIN) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)"
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: 360,
          textAlign: "center",
          background: "rgba(255,255,255,0.95)"
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Enter PIN</h2>

        <input
          type="password"
          value={pin}
          maxLength={4}
          placeholder="****"
          onChange={(e) => setPin(e.target.value)}
          style={{ textAlign: "center", fontSize: 20 }}
        />

        <button className="mt-3" onClick={handleSubmit}>
          Unlock
        </button>

        {error && (
          <p style={{ color: "#dc2626", marginTop: 12 }}>
            Incorrect PIN
          </p>
        )}
      </div>
    </div>
  );
}
