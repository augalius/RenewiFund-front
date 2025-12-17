import { MapPin, Clock, TrendingUp, Zap, Leaf, X } from 'lucide-react';
import type { Project } from './ProjectList';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  isAccountValid: boolean;
}

export function ProjectCard({ project, isAccountValid }: ProjectCardProps) {
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
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

  const calculateEstReturn = (amount: number) => {
    return (amount * (project.expectedReturn / 100)).toFixed(2);
  };

  const calculateEstKwh = (amount: number) => {
    const share = amount / project.fundingGoal;
    return Math.floor(share * project.kWhPerYear).toLocaleString();
  };

  const calculateEstCO2 = (amount: number) => {
    const share = amount / project.fundingGoal;
    return Math.floor(share * project.co2SavedPerYear).toLocaleString();
  };

  const handleInvest = () => {
    if (!isAccountValid) return;
    setShowInvestModal(true);
  };

  const handleConfirmInvestment = () => {
    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Įveskite teisingą sumą");
      return;
    }

    // Get current user
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    // Check if user has enough balance
    if (user.balance < amount) {
      alert("Nepakankamas balansas!");
      return;
    }

    // Update user balance
    const updatedUser = {
      ...user,
      balance: user.balance - amount
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("userChanged"));

    // Get existing investments
    const investments = JSON.parse(localStorage.getItem("investments") || "[]");
    
    // Add new investment
    investments.push({
      id: Date.now(),
      projectId: project.id,
      projectTitle: project.title,
      amount: amount,
      userEmail: user.email,
      date: new Date().toISOString(),
      expectedReturn: project.expectedReturn,
      estimatedKwh: calculateEstKwh(amount),
      estimatedCO2: calculateEstCO2(amount),
      status: 'active'
    });
    
    localStorage.setItem("investments", JSON.stringify(investments));
    
    alert(`Sėkmingai investuota ${formatCurrency(amount)} į projektą "${project.title}"`);
    
    // Reset and close modal
    setInvestmentAmount('');
    setSelectedOption(null);
    setShowInvestModal(false);
  };

  const quickAmounts = [50, 100, 500, 1000, 5000];

  return (
    <>
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
            onClick={handleInvest}
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

      {/* INVESTMENT MODAL */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setShowInvestModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-semibold mb-4">Investuoti į projektą</h3>
            <p className="text-gray-600 mb-2">{project.title}</p>

            {/* Current user balance */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-green-700">Jūsų balansas:</span>
                <span className="font-semibold">
                  {formatCurrency(JSON.parse(localStorage.getItem("user") || "{}").balance || 0)}
                </span>
              </div>
            </div>

            {/* Quick amount buttons */}
            <div className="mb-6">
              <p className="text-gray-700 mb-3">Greiti pasirinkimai (€):</p>
              <div className="grid grid-cols-5 gap-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setInvestmentAmount(amount.toString());
                      setSelectedOption(amount);
                    }}
                    className={`py-2 rounded-lg border ${
                      selectedOption === amount
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom amount input */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Arba įveskite savo sumą (€)</label>
              <div className="relative">
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => {
                    setInvestmentAmount(e.target.value);
                    setSelectedOption(null);
                  }}
                  placeholder="0"
                  min="10"
                  step="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  €
                </span>
              </div>
            </div>

            {/* Investment preview */}
            {investmentAmount && parseFloat(investmentAmount) > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 mb-2">Jūsų investicija:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Investuojama suma:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(investmentAmount))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Numatoma metinė grąža:</span>
                    <span className="font-semibold text-green-600">
                      {calculateEstReturn(parseFloat(investmentAmount))} €
                    </span>
                  </div>
                  {project.kWhPerYear > 0 && (
                    <div className="flex justify-between">
                      <span>Numatoma kWh per metus:</span>
                      <span className="font-semibold">{calculateEstKwh(parseFloat(investmentAmount))}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Numatomas CO₂ sutaupymas:</span>
                    <span className="font-semibold">{calculateEstCO2(parseFloat(investmentAmount))} t</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleConfirmInvestment}
                disabled={!investmentAmount || parseFloat(investmentAmount) <= 0}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  investmentAmount && parseFloat(investmentAmount) > 0
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Patvirtinti investiciją
              </button>
              <button
                onClick={() => setShowInvestModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Atšaukti
              </button>
            </div>

            {/* Terms notice */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              Spustelėdami „Patvirtinti investiciją“ sutinkate su mūsų investavimo sąlygomis
            </p>
          </div>
        </div>
      )}
    </>
  );
}