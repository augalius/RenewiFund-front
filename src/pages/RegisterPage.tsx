import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <div className="flex items-center justify-center pt-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-10 border border-gray-200">

        <h2 className="text-3xl font-semibold text-green-600 mb-6 text-center">
          Registracija
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Vardas *</label>
            <input
              type="text"
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
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Slaptažodis *</label>
            <input
              type="password"
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
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-300 
                         focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Terms (full width) */}
          {/* <div className="md:col-span-2 flex items-center gap-3 mt-2">
            <input type="checkbox" required className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">
              Sutinku su{" "}
              <span className="text-green-600 underline cursor-pointer">naudojimo sąlygomis</span>{" "}
              ir{" "}
              <span className="text-green-600 underline cursor-pointer">privatumo politika</span>.
            </span>
          </div> */}

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
