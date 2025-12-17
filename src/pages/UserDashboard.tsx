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

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAccountValid = user.balance > 0 && user.isVerified;

  // Summary KPI values
  const investedAmount = 12500;
  const totalReturn = 860;
  const totalKwhReceived = 1820;
  const co2Saved = 1280;

  const submittedProjects = [
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

  const investments = [
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

  const portfolioGrowthData = [
    { month: "Sau", value: 8200 },
    { month: "Vas", value: 9100 },
    { month: "Kov", value: 10100 },
    { month: "Bal", value: 11000 },
    { month: "Geg", value: 11800 },
    { month: "Bir", value: 12500 },
  ];

  const kwhHistory = [
    { month: "Sau", kwh: 200 },
    { month: "Vas", kwh: 230 },
    { month: "Kov", kwh: 270 },
    { month: "Bal", kwh: 300 },
    { month: "Geg", kwh: 350 },
    { month: "Bir", kwh: 470 },
  ];

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


        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <Coins className="w-8 h-8 mx-auto text-green-600 mb-3" />
            <div className="text-2xl font-bold">{investedAmount} €</div>
            <div className="text-gray-500 text-sm">Investuota suma</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <BarChart3 className="w-8 h-8 mx-auto text-green-600 mb-3" />
            <div className="text-2xl font-bold">{totalReturn} €</div>
            <div className="text-gray-500 text-sm">Gauta grąža</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <BarChart3 className="w-8 h-8 mx-auto text-green-600 mb-3" />
            <div className="text-2xl font-bold">{totalKwhReceived} kWh</div>
            <div className="text-gray-500 text-sm">Gauta energija</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center">
            <Leaf className="w-8 h-8 mx-auto text-green-600 mb-3" />
            <div className="text-2xl font-bold">{co2Saved} kg</div>
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
                {investments.map((inv) => (
                  <tr key={inv.id} className="border-b last:border-none">
                    <td className="py-2">{inv.project}</td>
                    <td className="py-2">{inv.amount} €</td>
                    <td className="py-2">{inv.kwh}</td>
                    <td className="py-2">{inv.return}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submitted Projects */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Pateikti projektai</h2>

            <div className="space-y-4">
              {submittedProjects.map((p) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Portfolio Growth */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Portfelio augimas</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={portfolioGrowthData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#16a34a"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* kWh Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Gauta energija (kWh)</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={kwhHistory}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="kwh" fill="#16a34a" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
