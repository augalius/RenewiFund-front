import { useState } from "react";

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      title,
      desc,
    };

    const existing = JSON.parse(localStorage.getItem("projects") || "[]");
    localStorage.setItem("projects", JSON.stringify([...existing, newProject]));

    setTitle("");
    setDesc("");
    alert("Projektas išsaugotas!");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pateikti projektą</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border rounded p-3"
          placeholder="Projekto pavadinimas"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border rounded p-3"
          placeholder="Projekto aprašymas"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
          Išsaugoti
        </button>
      </form>
    </div>
  );
}
