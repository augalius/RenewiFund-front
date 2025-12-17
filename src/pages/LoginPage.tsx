import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const demoUser = { name: "Jonas", surname: "Jonaitis", email: "jonas@example.com" };
    localStorage.setItem("user", JSON.stringify(demoUser));

    window.dispatchEvent(new Event("userChanged"));

    navigate("/dashboard");
  }

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
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Slaptažodis</label>
            <input
              type="password"
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
