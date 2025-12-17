import {
  User,
  Briefcase,
  FilePlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-green-700 mb-8 hidden md:block">
          RenewiFund
        </h2>

      <nav className="space-y-4 text-gray-700">
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <User className="w-5 h-5 text-green-600" />
          Profilis
        </div>

        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <Briefcase className="w-5 h-5 text-green-600" />
          Investicijos
        </div>

        <div
          onClick={() => navigate("/my-projects")}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <FilePlus className="w-5 h-5 text-green-600" />
          Mano projektai
        </div>
      </nav>
    </aside>
  );
}

