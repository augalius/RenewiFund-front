import { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";

export default function NewProject() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "solar",
    fundingGoal: "",
    location: "",
    duration: "",
    expectedReturn: "",
    kWhPerYear: "",
    co2SavedPerYear: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Save the project with user email
    const projects = JSON.parse(localStorage.getItem("submittedProjects") || "[]");
    const newProject = {
      id: Date.now(),
      ...formData,
      userEmail: user.email,
      status: "Vertinama",
      date: new Date().toISOString().split('T')[0]
    };

projects.push(newProject);
localStorage.setItem("submittedProjects", JSON.stringify(projects));

// Dispatch event to update dashboard
window.dispatchEvent(new Event("projectsChanged"));

    // Reset form after showing success message
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: "",
        description: "",
        category: "solar",
        fundingGoal: "",
        location: "",
        duration: "",
        expectedReturn: "",
        kWhPerYear: "",
        co2SavedPerYear: "",
      });
    }, 3000);
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-green-600 mb-2">Projektas sėkmingai pateiktas!</h2>
          <p className="text-gray-600">
            Ačiū, kad pateikėte projektą. Mūsų komanda peržiūrės jūsų paraišką
            per 3–5 darbo dienas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* TITLE SECTION */}
      <div className="mb-8 text-center">
        <h2 className="text-green-600 text-2xl font-semibold mb-2">Pateikite duomenis apie savo projektą</h2>
        <p className="text-gray-600">
          Turite tvarią idėją, kuriai reikalingas finansavimas? Pasidalinkite ja
          su mūsų komanda.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TITLE */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Projekto pavadinimas *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="pvz., Saulės jėgainės plėtra – Kaunas"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Projekto aprašymas *
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Aprašykite projektą, jo tikslus ir poveikį aplinkai..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-gray-700 mb-2">Kategorija *</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="solar">Saulės energetika</option>
              <option value="wind">Vėjo energetika</option>
              <option value="forestry">Miškininkystė</option>
              <option value="green-building">Tvarūs pastatai</option>
            </select>
          </div>

          {/* FUNDING GOAL */}
          <div>
            <label className="block text-gray-700 mb-2">
              Ieškoma investicijų suma (EUR) *
            </label>
            <input
              type="number"
              name="fundingGoal"
              required
              value={formData.fundingGoal}
              onChange={handleChange}
              placeholder="2500000"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-gray-700 mb-2">Vieta *</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="pvz., Kaunas, Lietuva"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* DURATION */}
          <div>
            <label className="block text-gray-700 mb-2">Projekto trukmė *</label>
            <input
              type="text"
              name="duration"
              required
              value={formData.duration}
              onChange={handleChange}
              placeholder="pvz., 24 mėnesiai"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* RETURN */}
          <div>
            <label className="block text-gray-700 mb-2">
              Tikėtina metinė grąža (%) *
            </label>
            <input
              type="number"
              name="expectedReturn"
              required
              value={formData.expectedReturn}
              onChange={handleChange}
              placeholder="7.5"
              step="0.1"
              min="0"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* KWH */}
          <div>
            <label className="block text-gray-700 mb-2">
              Pagaminama energija (kWh/metus)
            </label>
            <input
              type="number"
              name="kWhPerYear"
              value={formData.kWhPerYear}
              onChange={handleChange}
              placeholder="6500000"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* CO2 */}
          <div>
            <label className="block text-gray-700 mb-2">
              CO₂ sutaupymas (tonos/metus) *
            </label>
            <input
              type="number"
              name="co2SavedPerYear"
              required
              value={formData.co2SavedPerYear}
              onChange={handleChange}
              placeholder="3250"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Projekto nuotraukos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Paspauskite arba tempkite failus čia</p>
              <p className="text-gray-400 text-xs mt-1">PNG, JPG iki 10MB</p>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
          >
            Pateikti projektą
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({
                title: "",
                description: "",
                category: "solar",
                fundingGoal: "",
                location: "",
                duration: "",
                expectedReturn: "",
                kWhPerYear: "",
                co2SavedPerYear: "",
              })
            }
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Išvalyti
          </button>
        </div>
      </form>
    </div>
  );
}