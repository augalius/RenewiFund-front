import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If fields are empty, login as demo user
    if (!email.trim() && !password.trim()) {
      const demoUser = { 
        name: "Jonas", 
        surname: "Jonaitis", 
        email: "demo@example.com",
        balance: 0,
        isVerified: false
      };
      localStorage.setItem("user", JSON.stringify(demoUser));
      window.dispatchEvent(new Event("userChanged"));
      navigate("/dashboard");
      return;
    }

    // Check credentials against registered users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const foundUser = registeredUsers.find(
      (user: any) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      window.dispatchEvent(new Event("userChanged"));
      navigate("/dashboard");
    } else {
      alert("Neteisingas el. paštas arba slaptažodis!");
    }
  };

  return (
    <div className="flex items-center justify-center pt-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
        
        <h2 className="text-3xl font-semibold text-green-600 mb-6 text-center">
          Prisijungimas
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">El. paštas</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Slaptažodis</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl border-gray-300
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl 
                       hover:bg-green-700 transition-colors"
          >
            Prisijungti
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Neturi paskyros?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Registruotis
          </Link>
        </p>
      </div>
    </div>
  );
}