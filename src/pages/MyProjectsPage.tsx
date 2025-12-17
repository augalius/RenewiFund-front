import { useState, useEffect } from "react";
import { 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Zap, 
  Leaf, 
  FileText,
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin
} from "lucide-react";

// Define types
interface Investment {
  id: string | number;
  projectId: string;
  projectTitle: string;
  amount: number;
  userEmail: string;
  date: string;
  expectedReturn: number;
  estimatedKwh: string | number;
  estimatedCO2: string | number;
  status: string;
  investmentDate?: string;
  investmentAmount?: number;
  title?: string;
  location?: string;
  kWhPerYear?: number;
  co2SavedPerYear?: number;
}

interface SubmittedProject {
  id: string | number;
  title: string;
  description: string;
  category: string;
  fundingGoal: string | number;
  location: string;
  duration: string;
  expectedReturn: string | number;
  kWhPerYear: string | number;
  co2SavedPerYear: string | number;
  userEmail: string;
  status: string;
  date: string;
}

interface User {
  email: string;
  name?: string;
  surname?: string;
}

export function MyProjectsPage() {
  const [, setUser] = useState<User>({ email: "" });
  const [investedProjects, setInvestedProjects] = useState<Investment[]>([]);
  const [submittedProjects, setSubmittedProjects] = useState<SubmittedProject[]>([]);
  const [activeTab, setActiveTab] = useState<"invested" | "submitted">("invested");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    
    const handleDataChange = () => loadUserData();
    window.addEventListener("userChanged", handleDataChange);
    window.addEventListener("investmentsChanged", handleDataChange);
    window.addEventListener("projectsChanged", handleDataChange);

    return () => {
      window.removeEventListener("userChanged", handleDataChange);
      window.removeEventListener("investmentsChanged", handleDataChange);
      window.removeEventListener("projectsChanged", handleDataChange);
    };
  }, []);

  const loadUserData = () => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);

    // Load invested projects
    const storedInvestments: Investment[] = JSON.parse(localStorage.getItem("investments") || "[]");
    const userInvestments = storedInvestments.filter(
      (inv: Investment) => inv.userEmail === storedUser.email
    );
    
    // Enrich investments with project details
    const mockProjects: any[] = JSON.parse(localStorage.getItem("allProjects") || "[]");
    const enrichedInvestments = userInvestments.map(inv => {
      const projectDetails = mockProjects.find((p: any) => p.id === inv.projectId) || {};
      return {
        ...inv,
        ...projectDetails,
        investmentDate: inv.date,
        investmentAmount: inv.amount
      } as Investment;
    });
    
    setInvestedProjects(enrichedInvestments);

    // Load submitted projects
    const storedSubmitted: SubmittedProject[] = JSON.parse(localStorage.getItem("submittedProjects") || "[]");
    const userSubmitted = storedSubmitted.filter(
      (proj: SubmittedProject) => proj.userEmail === storedUser.email
    );
    setSubmittedProjects(userSubmitted);

    setLoading(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lt-LT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('lt-LT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'priimta':
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
      case 'vertinama':
      case 'review':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
      case 'atmesta':
        return 'bg-red-100 text-red-700';
      case 'completed':
      case 'baigta':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'priimta':
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'vertinama':
      case 'review':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
      case 'atmesta':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
      case 'baigta':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const calculateEstimatedReturn = (investmentAmount: number, expectedReturn: number, monthsHeld: number) => {
    const annualReturn = investmentAmount * (expectedReturn / 100);
    const monthlyReturn = annualReturn / 12;
    return (monthlyReturn * monthsHeld).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Kraunama...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mano projektai</h1>
        <p className="text-gray-600">
          Peržiūrėkite savo investuotus ir pateiktus projektus, jų būseną ir progresą.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Investuota suma</p>
              <p className="text-2xl font-bold">
                {formatCurrency(investedProjects.reduce((sum, inv) => sum + (inv.investmentAmount || inv.amount), 0))}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Investicijų skaičius</p>
              <p className="text-2xl font-bold">{investedProjects.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pateikti projektai</p>
              <p className="text-2xl font-bold">{submittedProjects.length}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Aktyvios investicijos</p>
              <p className="text-2xl font-bold">
                {investedProjects.filter(inv => inv.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("invested")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "invested"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Investuoti projektai ({investedProjects.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab("submitted")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "submitted"
                  ? "border-green-600 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Pateikti projektai ({submittedProjects.length})
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "invested" ? (
        <div>
          {investedProjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dar neturite investicijų</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Pradėkite investuoti į žaliuosius projektus ir jie atsiras čia.
              </p>
              <a
                href="/projects"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Peržiūrėti projektus
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {investedProjects.map((project) => {
                const investmentDate = new Date(project.investmentDate || project.date);
                const monthsHeld = Math.floor(
                  (new Date().getTime() - investmentDate.getTime()) / (30 * 24 * 60 * 60 * 1000)
                );
                const estimatedReturn = calculateEstimatedReturn(
                  project.investmentAmount || project.amount,
                  project.expectedReturn || 0,
                  monthsHeld
                );

                return (
                  <div key={project.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{project.title || project.projectTitle}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span>{project.location || "Nenurodyta"}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(project.status || 'active')}`}>
                          {getStatusIcon(project.status || 'active')}
                          {project.status === 'active' ? 'Aktyvi' : project.status || 'Aktyvi'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Investuota suma</p>
                          <p className="text-lg font-semibold">{formatCurrency(project.investmentAmount || project.amount)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Investavimo data</p>
                          <p className="text-lg font-semibold">{formatDate(project.investmentDate || project.date)}</p>
                        </div>
                      </div>

                      {/* Investment metrics */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <h4 className="font-medium mb-3">Investicijos rodikliai</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                              <TrendingUp className="w-4 h-4" />
                            </div>
                            <div className="text-green-700 font-medium">
                              {project.expectedReturn || 0}%
                            </div>
                            <div className="text-xs text-gray-500">Metinė grąža</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-amber-600 mb-1">
                              <Zap className="w-4 h-4" />
                            </div>
                            <div className="text-amber-700 font-medium">
                              {project.estimatedKwh || project.kWhPerYear || 0}
                            </div>
                            <div className="text-xs text-gray-500">Numatoma kWh</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
                              <Leaf className="w-4 h-4" />
                            </div>
                            <div className="text-emerald-700 font-medium">
                              {project.estimatedCO2 || project.co2SavedPerYear || 0}
                            </div>
                            <div className="text-xs text-gray-500">CO₂ sutaupymas</div>
                          </div>
                        </div>
                      </div>

                      {/* Estimated returns */}
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <h4 className="font-medium text-green-700 mb-2">Numatoma grąža</h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Iki šiol:</span>
                          <span className="font-semibold">{estimatedReturn} €</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Metinė:</span>
                          <span className="font-semibold">
                            {((project.investmentAmount || project.amount) * ((project.expectedReturn || 0) / 100)).toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div>
          {submittedProjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dar nepateikėte projektų</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Turite žaliąją idėją? Pateikite projektą finansavimui ir jis atsiras čia.
              </p>
              <a
                href="/submit-project"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Pateikti projektą
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {submittedProjects.map((project) => {
                const fundingGoal = typeof project.fundingGoal === 'string' 
                  ? parseFloat(project.fundingGoal) 
                  : project.fundingGoal;
                const expectedReturn = typeof project.expectedReturn === 'string'
                  ? parseFloat(project.expectedReturn)
                  : project.expectedReturn;

                return (
                  <div key={project.id} className="bg-white rounded-2xl shadow-sm border p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(project.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{formatCurrency(fundingGoal)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(project.status)}`}>
                          {getStatusIcon(project.status)}
                          {project.status === 'Vertinama' ? 'Peržiūrima' : project.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Projekto aprašymas</h4>
                        <p className="text-gray-600">{project.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Projekto detalės</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Kategorija:</span>
                            <span className="font-medium">
                              {project.category === 'solar' ? 'Saulės energija' :
                               project.category === 'wind' ? 'Vėjo energija' :
                               project.category === 'forestry' ? 'Miškininkystė' :
                               project.category === 'green-building' ? 'Tvarūs pastatai' : project.category}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Trukmė:</span>
                            <span className="font-medium">{project.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Numatoma grąža:</span>
                            <span className="font-medium text-green-600">{expectedReturn}%</span>
                          </div>
                          {project.kWhPerYear && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Numatoma energija:</span>
                              <span className="font-medium">{project.kWhPerYear} kWh/metus</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-gray-600">CO₂ sutaupymas:</span>
                            <span className="font-medium">{project.co2SavedPerYear} t/metus</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status updates */}
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium mb-3">Būsenos atnaujinimai</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(project.status)}`}>
                            {getStatusIcon(project.status)}
                          </div>
                          <div>
                            <p className="font-medium">
                              {project.status === 'Vertinama' ? 'Projektas peržiūrimas' :
                               project.status === 'Priimta' ? 'Projektas priimtas' :
                               'Projektas atnaujintas'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {project.status === 'Vertinama' 
                                ? 'Mūsų komanda peržiūri jūsų projektą. Peržiūra trunka iki 5 darbo dienų.'
                                : project.status === 'Priimta'
                                ? 'Sveikiname! Jūsų projektas priimtas ir bus įtrauktas į investavimo platformą.'
                                : 'Laukiama atnaujinimų.'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Atnaujinta: {formatDate(project.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}