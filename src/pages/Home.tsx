import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center text-center mt-10">

      {/* Main Heading */}
      <h1 className="text-5xl font-bold mb-4">
        Investicijos į žaliąją energiją
      </h1>

      {/* Description */}
      <p className="max-w-3xl text-gray-600 leading-relaxed">
        Rinkis tai, kas svarbu. Investuotojai, tvarūs projektai – puiki galimybė
        ekologiškesnėms energetinėms iniciatyvoms.  
        Investuok ir prisidėk prie švaresnio rytojaus – o tavo investicijos generuos
        grąžą iš realiai veikiančių žaliųjų projektų.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-5 mt-10">
        <button className="bg-[#06402B] text-white px-8 py-3 rounded-full font-medium">
          Investuoti į žaliąją energiją
        </button>
        <Link
          to="/projects"
          className="bg-[#06402B] text-white px-8 py-3 rounded-full font-medium">
          Peržiūrėti projektus
        </Link>
        <Link 
          to="/new"
          className="bg-[#06402B] text-white px-8 py-3 rounded-full font-medium">
          Pateikti projektą
        </Link>
      </div>

      <CalculatorBox/>
    </div>
  );
}

function CalculatorBox() {
  const [tab, setTab] = useState<"eur" | "kwh" | "co2">("eur");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const calculate = (value: string, mode: "eur" | "kwh" | "co2") => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult("");
      return;
    }

    // Example formulas — replace with real ones if needed
    if (mode === "eur") setResult((num * 1.12).toFixed(2) + " €");
    if (mode === "kwh") setResult((num * 0.85).toFixed(2) + " kWh");
    if (mode === "co2") setResult((num * 0.42).toFixed(2) + " kg CO₂");
  };

  // update calculation when typing
  const handleChange = (value: string) => {
    setAmount(value);
    calculate(value, tab);
  }

  // update when switching tabs
  useEffect(() =>{
    if (amount.trim() !== ""){
      calculate(amount, tab);
    }
  }, [tab]);

  return (
    <div className="w-[90%] md:w-[1100px] mt-16 bg-white border border-[#CFE8DA] rounded-3xl shadow-sm">
      
      {/* --- TABS --- */}
      <div className="grid grid-cols-3 text-center font-medium text-gray-700">
        <div
          onClick={() => setTab("eur")}
          className={`py-3 cursor-pointer transition ${
            tab === "eur" ? "bg-white" : "bg-[#E1F5EA]"
          }`}
        >
          Grąžos skaičiuoklė, Eur
        </div>

        <div
          onClick={() => setTab("kwh")}
          className={`py-3 cursor-pointer transition ${
            tab === "kwh" ? "bg-white" : "bg-[#E1F5EA]"
          }`}
        >
          Grąžos skaičiuoklė, kWh
        </div>

        <div
          onClick={() => setTab("co2")}
          className={`py-3 cursor-pointer transition ${
            tab === "co2" ? "bg-white" : "bg-[#E1F5EA]"
          }`}
        >
          CO₂ sutaupymo rodiklis
        </div>
      </div>

      {/* --- CALCULATOR BOX --- */}
      <div className="px-10 py-10 text-left">
        <h2 className="text-2xl font-semibold mb-6">
          {tab === "eur" && "Investicijų skaičiuoklė"}
          {tab === "kwh" && "Grąžos skaičiuoklė, kWh"}
          {tab === "co2" && "CO₂ sutaupymo rodiklis"}
        </h2>

        <div className="grid grid-cols-2 gap-10">

          {/* LEFT INPUT */}
          <div>
            <p className="font-medium mb-2">Įveskite sumą</p>

            <input
              type="number"
              value={amount}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="0"
              className="bg-white border border-[#B8DCC8] rounded-2xl px-5 py-4 text-xl w-full outline-none"
            />
          </div>

          {/* RIGHT OUTPUT */}
          <div>
            <p className="font-medium mb-2">Rezultatas</p>
            <div className="bg-white border border-[#B8DCC8] rounded-2xl px-5 py-4 text-xl">
              {result || "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

