import { useEffect, useState } from "react";

export default function ProjectsList() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(stored);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Peržiūrėti projektus</h1>

      {projects.length === 0 ? (
        <p>Nėra pateiktų projektų.</p>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p.id} className="border p-4 rounded-xl bg-gray-50 shadow-sm">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-gray-700">{p.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
