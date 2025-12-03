import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { Search, Filter } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "solar" | "wind" | "forestry" | "green-building";
  fundingGoal: number;
  currentFunding: number;
  expectedReturn: number;
  kWhPerYear: number;
  co2SavedPerYear: number;
  imageUrl: string;
  location: string;
  duration: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Saulės jėgainės plėtra – Marijampolė",
    description:
      "Plėsti esamą saulės jėgainę 5 MW galia, tiekiant švarią energiją 1 500 namų ūkių.",
    category: "solar",
    fundingGoal: 2500000,
    currentFunding: 1850000,
    expectedReturn: 7.5,
    kWhPerYear: 6500000,
    co2SavedPerYear: 3250,
    imageUrl:
      "https://images.unsplash.com/photo-1545209575-704d1434f9cd?auto=format&fit=crop&w=1080&q=80",
    location: "Marijampolė, Lietuva",
    duration: "24 mėnesiai",
  },
  {
    id: "2",
    title: "Jūrinis vėjo parkas – Baltijos jūra",
    description:
      "Įrengti 12 naujų vėjo turbinų, generuojančių 48 MW atsinaujinančios energijos.",
    category: "wind",
    fundingGoal: 5000000,
    currentFunding: 3200000,
    expectedReturn: 8.2,
    kWhPerYear: 125000000,
    co2SavedPerYear: 62500,
    imageUrl:
      "https://images.unsplash.com/photo-1659523776327-9faedcb13ff6?auto=format&fit=crop&w=1080&q=80",
    location: "Klaipėda, Lietuva",
    duration: "36 mėnesiai",
  },
  {
    id: "3",
    title: "Atsodinimo iniciatyva – Varėna",
    description:
      "Pasodinti 500 000 vietinių medžių, atkuriant pažeistus atogrąžų miškų plotus ir sugeriant CO₂.",
    category: "forestry",
    fundingGoal: 750000,
    currentFunding: 620000,
    expectedReturn: 6.5,
    kWhPerYear: 0,
    co2SavedPerYear: 125000,
    imageUrl:
      "https://images.unsplash.com/photo-1592303235394-bf02ae14f6fe?auto=format&fit=crop&w=1080&q=80",
    location: "Varėna, Lietuva",
    duration: "48 mėnesiai",
  },
  {
    id: "4",
    title: "Tvarių pastatų modernizacija – Kaunas",
    description:
      "Modernizuoti 50 komercinių pastatų: įrengti saulės paneles, šilumos siurblius ir efektyvias energijos sistemas.",
    category: "green-building",
    fundingGoal: 3200000,
    currentFunding: 1500000,
    expectedReturn: 7.8,
    kWhPerYear: 8500000,
    co2SavedPerYear: 4250,
    imageUrl:
      "https://images.unsplash.com/photo-1699302214498-d9f115d93ffd?auto=format&fit=crop&w=1080&q=80",
    location: "Kaunas, Lietuva",
    duration: "18 mėnesių",
  },
];

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16"> 

      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-green-600 text-2xl font-semibold mb-2">
          Investiciniai projektai
        </h2>
        <p className="text-gray-600">
          Peržiūrėkite patikrintus tvarius projektus ir prisidėkite prie žalios ateities.
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-5 mb-10">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Ieškoti projektų..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-12 pr-10 py-3 border border-gray-300 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-green-500
                       bg-white min-w-[210px]"
          >
            <option value="all">Visos kategorijos</option>
            <option value="solar">Saulės energetika</option>
            <option value="wind">Vėjo energetika</option>
            <option value="forestry">Miškininkystė</option>
            <option value="green-building">Žalieji pastatai</option>
          </select>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 👆 Increased spacing between cards */}
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            Pagal pasirinktus kriterijus projektų nerasta.
          </p>
        </div>
      )}
    </div>
  );
}