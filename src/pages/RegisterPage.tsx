import { Link, useNavigate } from "react-router-dom";

export function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      password: formData.get("password") as string,
      balance: 0,
      isVerified: false,
    };

    // Save user data in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Check if email already exists
    if (existingUsers.some((user: any) => user.email === userData.email)) {
      alert("Šis el. paštas jau užregistruotas!");
      return;
    }

    // Add new user
    existingUsers.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));
    
    // Auto-login after registration
    localStorage.setItem("user", JSON.stringify({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      balance: 0,
      isVerified: false,
    }));
    
    window.dispatchEvent(new Event("userChanged"));
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center pt-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-10 border border-gray-200">

        <h2 className="text-3xl font-semibold text-green-600 mb-6 text-center">
          Registracija
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Vardas *</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Surname */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Pavardė *</label>
            <input
              type="text"
              name="surname"
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">El. paštas *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Telefono numeris *</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Address (full width) */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Adresas (gatvė, miestas, šalis)</label>
            <input
              type="text"
              name="address"
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Slaptažodis *</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Pakartokite slaptažodį *</label>
            <input
              type="password"
              name="confirmPassword"
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Terms (full width) */}
          <div className="md:col-span-2 flex items-center gap-3 mt-2">
            <input type="checkbox" required className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">
              Sutinku su{" "}
              <span className="text-green-600 underline cursor-pointer">naudojimo sąlygomis</span>{" "}
              ir{" "}
              <span className="text-green-600 underline cursor-pointer">privatumo politika</span>.
            </span>
          </div>

          {/* Submit button */}
          <div className="md:col-span-2 mt-3">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl
                         hover:bg-green-700 transition-colors"
            >
              Registruotis
            </button>
          </div>

        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          Jau turite paskyrą?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Prisijungti
          </Link>
        </p>

      </div>
    </div>
  );
}