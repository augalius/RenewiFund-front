import { MapPin, Clock, TrendingUp, Zap, Leaf } from 'lucide-react';
import type { Project } from './ProjectList';

interface ProjectCardProps {
  project: Project;
  isAccountValid: boolean;
}

export function ProjectCard({ project, isAccountValid }: ProjectCardProps) {
  const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lt-LT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('lt-LT').format(num);
  };

  const translateCategory = (cat: string) => {
    switch (cat) {
      case 'solar':
        return 'Saulės energija';
      case 'wind':
        return 'Vėjo energija';
      case 'forestry':
        return 'Miškininkystė';
      case 'green-building':
        return 'Tvarūs pastatai';
      default:
        return cat;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#CFE8DA] overflow-hidden hover:shadow-md transition-shadow">
      {/* IMAGE */}
      <div className="relative h-48">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-green-700">
            {translateCategory(project.category)}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="mb-2 font-semibold text-[18px] text-gray-800">
          {project.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* LOCATION + DURATION */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{project.duration}</span>
          </div>
        </div>

        {/* FUNDING BAR */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Finansavimo progresas</span>
            <span className="text-green-600">{fundingPercentage.toFixed(0)}%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-full transition-all"
              style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-500">
              {formatCurrency(project.currentFunding)} surinkta
            </span>
            <span className="text-gray-900">
              Tikslas: {formatCurrency(project.fundingGoal)}
            </span>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-[#F4FAF7] rounded-xl border border-[#D7EDE1]">
          {/* ROI */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-green-700 font-medium">{project.expectedReturn}%</div>
            <div className="text-xs text-gray-500">Metinė grąža</div>
          </div>

          {/* kWh */}
          {project.kWhPerYear > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-600 mb-1">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-amber-700 font-medium">
                {formatNumber(project.kWhPerYear)}
              </div>
              <div className="text-xs text-gray-500">kWh per metus</div>
            </div>
          )}

          {/* CO2 */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="text-emerald-700 font-medium">
              {formatNumber(project.co2SavedPerYear)}
            </div>
            <div className="text-xs text-gray-500">tonų CO₂ per metus</div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={!isAccountValid}
          className={`w-full py-3 rounded-lg transition-colors ${
            isAccountValid
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isAccountValid ? "Investuoti" : "Paskyra neaktyvi"}
        </button>
      </div>
    </div>
  );
}
