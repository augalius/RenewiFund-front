import { useEffect, useState } from "react";
import { Camera, Wallet, Save, Edit2, X } from "lucide-react";

interface User {
  name: string;
  surname: string;
  email: string;
  phone?: string;
  address?: string;
  balance: number;
  avatar?: string;
  isVerified?: boolean;
}

export function ProfilePage() {
  const [user, setUser] = useState<User>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    balance: 0,
  });

  const [editMode, setEditMode] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser({
        ...parsed,
        balance: parsed.balance ?? 0,
        isVerified: parsed.isVerified ?? false,
      });
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditMode(false);
    alert("Profilis išsaugotas");
  };

  const cancelEdit = () => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
    setEditMode(false);
  };

  const handleDeposit = () => {
    if (!depositAmount) return;

    const updated = {
      ...user,
      balance: user.balance + Number(depositAmount),
    };

    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    window.dispatchEvent(new Event("userChanged"));
    setDepositAmount("");
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...user, avatar: reader.result as string };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-semibold mb-8">Mano profilis</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* LEFT – Profile card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img
              src={user.avatar || "/avatar-placeholder.png"}
              alt="avatar"
              className="w-full h-full rounded-full object-cover border"
            />

            {editMode && (
              <label className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full cursor-pointer">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <h2 className="text-xl font-semibold">
            {user.name} {user.surname}
          </h2>
          <p className="text-gray-500 text-sm">{user.email}</p>

          {/* Wallet */}
          <div className="mt-6 p-4 bg-[#F2F7F4] rounded-xl">
            <div className="flex items-center justify-center gap-2 text-green-700 mb-1">
              <Wallet className="w-5 h-5" />
              Balansas
            </div>
            <div className="text-2xl font-bold">{user.balance} €</div>
          </div>

          {/* Deposit */}
          <div className="mt-4 flex gap-2">
            <input
              type="number"
              placeholder="Suma €"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="flex-1 border rounded-lg px-1 py-2"
            />
            <button
              onClick={handleDeposit}
              className="bg-green-600 text-white px-2 rounded-lg"
            >
              Papildyti
            </button>
          </div>
        </div>

        {/* RIGHT – Info */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Asmeninė informacija
            </h2>

            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 text-green-700"
              >
                <Edit2 className="w-4 h-4" />
                Redaguoti
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={saveProfile}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  <Save className="w-4 h-4" />
                  Išsaugoti
                </button>
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 border px-4 py-2 rounded-lg"
                >
                  <X className="w-4 h-4" />
                  Atšaukti
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Vardas", "name"],
              ["Pavardė", "surname"],
              ["Telefonas", "phone"],
              ["Adresas", "address"],
            ].map(([label, key]) => (
              <div key={key}>
                <label className="text-sm text-gray-600">{label}</label>
                <input
                  value={(user as any)[key] || ""}
                  disabled={!editMode}
                  onChange={(e) =>
                    setUser({ ...user, [key]: e.target.value })
                  }
                  className={`w-full mt-1 px-4 py-3 border rounded-lg ${
                    !editMode ? "bg-gray-50" : ""
                  }`}
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">El. paštas</label>
              <input
                value={user.email}
                disabled
                className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold mb-3">
            Tapatybės patvirtinimas
          </h3>

          {user.isVerified ? (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-3 rounded-lg">
              ✅ Paskyra patvirtinta
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <p className="text-sm text-yellow-800 mb-3">
                Norėdami investuoti, turite patvirtinti savo tapatybę.
              </p>

              <a
                href="https://www.epaslaugos.lt/portal/nlogin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg"
                onClick={() => {
                  // DEMO: mark verified after redirect
                  const updated = { ...user, isVerified: true };
                  setUser(updated);
                  localStorage.setItem("user", JSON.stringify(updated));
                  window.dispatchEvent(new Event("userChanged"));
                }}
              >
                Patvirtinti tapatybę
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
