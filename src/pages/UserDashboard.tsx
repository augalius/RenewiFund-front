import { useState, useEffect } from "react";
import {
  BarChart3,
  Leaf,
  Coins,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export function UserDashboard() {
  const [user, setUser] = useState<any>({});
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [investments, setInvestments] = useState<any[]>([]);
  const [submittedProjects, setSubmittedProjects] = useState<any[]>([]);
  const [isDemoUser, setIsDemoUser] = useState(false);
  const [portfolioGrowthData, setPortfolioGrowthData] = useState<any[]>([]);
  const [kwhHistoryData, setKwhHistoryData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(storedUser);
      setIsAccountValid(storedUser.balance > 0 && storedUser.isVerified);
      
      // Check if it's demo user (demo@example.com email)
      setIsDemoUser(storedUser.email === "demo@example.com");

      // Load investments from localStorage
      const storedInvestments = JSON.parse(localStorage.getItem("investments") || "[]");
      
      // Filter investments by current user's email
      const userInvestments = storedInvestments.filter(
        (inv: any) => inv.userEmail === storedUser.email
      );
      setInvestments(userInvestments);

      // Load submitted projects
      const storedProjects = JSON.parse(localStorage.getItem("submittedProjects") || "[]");
      const userProjects = storedProjects.filter(
        (proj: any) => proj.userEmail === storedUser.email
      );
      setSubmittedProjects(userProjects);

      // Generate dynamic chart data based on investments
      generateChartData(userInvestments);
    };

    const generateChartData = (userInvestments: any[]) => {
      if (userInvestments.length === 0) {
        // Empty data for new users
        setPortfolioGrowthData([]);
        setKwhHistoryData([]);
        return;
      }

      // Generate portfolio growth data (last 6 months)
      const months = ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru"];
      const portfolioData = [];

      // Calculate total invested amount
      const totalInvested = userInvestments.reduce((sum, inv) => sum + inv.amount, 0);

      // Generate growth data based on investments
      for (let i = 5; i >= 0; i--) {
        const monthIndex = (new Date().getMonth() - i + 12) % 12;
        const monthName = months[monthIndex];
        
        // Simulate growth based on investment dates and returns
        let monthValue = totalInvested;
        
        // Add growth for investments made before this month
        userInvestments.forEach(inv => {
          const invDate = new Date(inv.date);
          const monthsSinceInvestment = (new Date().getFullYear() - invDate.getFullYear()) * 12 + 
                                       (new Date().getMonth() - invDate.getMonth());
          
          if (monthsSinceInvestment >= (6 - i)) {
            // Investment has been active for this period
            const growth = inv.amount * (inv.expectedReturn / 100) * (monthsSinceInvestment / 12);
            monthValue = Math.max(monthValue, inv.amount + growth);
          }
        });

        // Add some random variation
        const variation = Math.random() * 0.05 * totalInvested;
        const finalValue = Math.max(totalInvested, monthValue + (Math.random() > 0.5 ? variation : -variation));
        
        portfolioData.push({
          month: monthName,
          value: Math.round(finalValue)
        });
      }

      setPortfolioGrowthData(portfolioData);

      // Generate kWh history data
      const kwhData = [];
      const monthlyKwh: {[key: string]: number} = {};

      // Group kWh by month from investments
      userInvestments.forEach(inv => {
        const invDate = new Date(inv.date);
        const monthName = months[invDate.getMonth()];
        
        if (!monthlyKwh[monthName]) {
          monthlyKwh[monthName] = 0;
        }
        
        // Convert estimatedKwh string to number (handle commas)
        const kwhValue = parseInt(String(inv.estimatedKwh).replace(/,/g, '')) || 0;
        monthlyKwh[monthName] += kwhValue / 12; // Divide by 12 to get monthly average
      });

      // Fill last 6 months with data
      for (let i = 5; i >= 0; i--) {
        const monthIndex = (new Date().getMonth() - i + 12) % 12;
        const monthName = months[monthIndex];
        
        kwhData.push({
          month: monthName,
          kwh: Math.round(monthlyKwh[monthName] || Math.random() * 100 + 50) // Random data if no investments in that month
        });
      }

      setKwhHistoryData(kwhData);
    };

    loadData();

    const handleDataChange = () => loadData();
    window.addEventListener("userChanged", handleDataChange);
    window.addEventListener("investmentsChanged", handleDataChange);
    window.addEventListener("projectsChanged", handleDataChange);

    return () => {
      window.removeEventListener("userChanged", handleDataChange);
      window.removeEventListener("investmentsChanged", handleDataChange);
      window.removeEventListener("projectsChanged", handleDataChange);
    };
  }, []);

  // Demo data
  const demoPortfolioGrowthData = [
    { month: "Sau", value: 8200 },
    { month: "Vas", value: 9100 },
    { month: "Kov", value: 10100 },
    { month: "Bal", value: 11000 },
    { month: "Geg", value: 11800 },
    { month: "Bir", value: 12500 },
  ];

  const demoKwhHistoryData = [
    { month: "Sau", kwh: 200 },
    { month: "Vas", kwh: 230 },
    { month: "Kov", kwh: 270 },
    { month: "Bal", kwh: 300 },
    { month: "Geg", kwh: 350 },
    { month: "Bir", kwh: 470 },
  ];

  // Calculate KPIs from actual investments
  const investedAmount = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturn = investments.reduce((sum, inv) => sum + (inv.amount * (inv.expectedReturn / 100)), 0);
  const totalKwhReceived = investments.reduce((sum, inv) => sum + (parseInt(String(inv.estimatedKwh).replace(/,/g, '')) || 0), 0);
  const co2Saved = investments.reduce((sum, inv) => sum + (parseInt(String(inv.estimatedCO2).replace(/,/g, '')) || 0), 0);

  // Demo data for demo users
  const demoInvestments = [
    {
      id: 1,
      project: "Saulės parkas – Vilnius",
      amount: 5000,
      kwh: 650,
      return: "7.2%",
    },
    {
      id: 2,
      project: "Vėjo jėgainė – Klaipėda",
      amount: 3000,
      kwh: 770,
      return: "8.1%",
    },
    {
      id: 3,
      project: "CO₂ mažinimo programa",
      amount: 4500,
      kwh: 400,
      return: "6.5%",
    },
  ];

  const demoSubmittedProjects = [
    {
      id: 1,
      title: "Saulės elektrinė Kaune",
      status: "Vertinama",
      date: "2025-01-10",
    },
    {
      id: 2,
      title: "Vėjo turbinos modernizacija",
      status: "Priimta",
      date: "2024-12-18",
    },
  ];

  // Show empty state for non-demo users with no investments
  const showEmptyState = !isDemoUser && investments.length === 0 && submittedProjects.length === 0;
  const hasChartData = portfolioGrowthData.length > 0 || kwhHistoryData.length > 0;

  return (
    <div className="flex w-full min-h-screen bg-[#F2F7F4]">
      {/* Main Dashboard */}
      <div className="flex-1 p-6 md:p-10 overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Sveiki, {user?.name} {user?.surname}
        </h1>

        {!isAccountValid && (
          <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-xl">
            <p className="text-red-700 font-medium">
              ⚠️ Jūsų paskyra neaktyvi
            </p>
            <p className="text-sm text-red-600">
              Norėdami investuoti, papildykite balansą ir patvirtinkite tapatybę.
            </p>
          </div>
        )}

        {/* Empty State for New Users */}
        {showEmptyState && (
          <div className="mb-8 bg-white rounded-2xl p-8 shadow-sm border text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sveiki atvykę į RenewiFund!</h3>
              <p className="text-gray-600 mb-6">
                Jūs dar neturite investicijų. Pradėkite investuoti į žaliuosius projektus ir stebėkite savo investicijų augimą čia.
              </p>
              <button
                onClick={() => window.location.href = "/projects"}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Peržiūrėti investicinius projektus
              </button>
            </div>
          </div>
        )}

        {/* Show KPIs only if there's data */}
        {(isDemoUser || investments.length > 0) && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
                <Coins className="w-8 h-8 mx-auto text-green-600 mb-3" />
                <div className="text-2xl font-bold">
                  {isDemoUser ? "12500" : investedAmount} €
                </div>
                <div className="text-gray-500 text-sm">Investuota suma</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
                <BarChart3 className="w-8 h-8 mx-auto text-green-600 mb-3" />
                <div className="text-2xl font-bold">
                  {isDemoUser ? "860" : totalReturn.toFixed(0)} €
                </div>
                <div className="text-gray-500 text-sm">Gauta grąža</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
                <BarChart3 className="w-8 h-8 mx-auto text-green-600 mb-3" />
                <div className="text-2xl font-bold">
                  {isDemoUser ? "1820" : totalKwhReceived} kWh
                </div>
                <div className="text-gray-500 text-sm">Gauta energija</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
                <Leaf className="w-8 h-8 mx-auto text-green-600 mb-3" />
                <div className="text-2xl font-bold">
                  {isDemoUser ? "1280" : co2Saved} kg
                </div>
                <div className="text-gray-500 text-sm">CO₂ sutaupyta</div>
              </div>
            </div>

            {/* Investments + Submitted Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Investments */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Mano Investicijos</h2>

                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-500 text-sm border-b">
                      <th className="pb-2">Projektas</th>
                      <th className="pb-2">Suma</th>
                      <th className="pb-2">kWh</th>
                      <th className="pb-2">Grąža</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isDemoUser ? demoInvestments : investments).map((inv, index) => (
                      <tr key={inv.id || index} className="border-b last:border-none">
                        <td className="py-2">{inv.project || inv.projectTitle}</td>
                        <td className="py-2">{inv.amount} €</td>
                        <td className="py-2">{inv.kwh || inv.estimatedKwh}</td>
                        <td className="py-2">{inv.return || `${inv.expectedReturn}%`}</td>
                      </tr>
                    ))}
                    {!isDemoUser && investments.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-gray-500">
                          Dar neturite investicijų
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Submitted Projects */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Pateikti projektai</h2>

                <div className="space-y-4">
                  {(isDemoUser ? demoSubmittedProjects : submittedProjects).length > 0 ? (
                    (isDemoUser ? demoSubmittedProjects : submittedProjects).map((p) => (
                      <div
                        key={p.id}
                        className="p-4 border rounded-xl flex justify-between items-center"
                      >
                        <div>
                          <div className="font-medium">{p.title}</div>
                          <div className="text-sm text-gray-500">{p.date}</div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm ${
                            p.status === "Priimta"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {p.status}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      Dar nepateikėte jokių projektų
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Charts - only show for demo users or users with investments */}
            {(isDemoUser || hasChartData) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {/* Portfolio Growth */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h2 className="text-xl font-semibold mb-4">Portfelio augimas</h2>
                  {(isDemoUser || portfolioGrowthData.length > 0) ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={isDemoUser ? demoPortfolioGrowthData : portfolioGrowthData}>
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} €`, 'Vertė']}
                          labelFormatter={(label) => `Mėnuo: ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#16a34a"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[280px] flex items-center justify-center text-gray-500">
                      Nėra duomenų portfelio augimui rodyti
                    </div>
                  )}
                </div>

                {/* kWh Bar Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <h2 className="text-xl font-semibold mb-4">Gauta energija (kWh)</h2>
                  {(isDemoUser || kwhHistoryData.length > 0) ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={isDemoUser ? demoKwhHistoryData : kwhHistoryData}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} kWh`, 'Energija']}
                          labelFormatter={(label) => `Mėnuo: ${label}`}
                        />
                        <Bar dataKey="kwh" fill="#16a34a" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[280px] flex items-center justify-center text-gray-500">
                      Nėra duomenų energijos gavimui rodyti
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}