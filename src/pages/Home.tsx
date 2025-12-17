import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center text-center mt-10">

      {/* Main Heading */}
      <h1 className="text-green-600 text-5xl font-bold mb-4">
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
    if (isNaN(num) || num <= 0) {
      setResult("");
      return;
    }

    // REALISTIC FORMULAS:
    if (mode === "eur") {
      // Investment calculator: € → expected return after 5 years
      // Average annual return for green energy projects: 6-9%
      const avgAnnualReturn = 0.075; // 7.5% average
      const years = 5;
      const futureValue = num * Math.pow(1 + avgAnnualReturn, years);
      const totalReturn = futureValue - num;
      const annualReturn = totalReturn / years;
      
      setResult(
        `${num.toLocaleString("lt-LT")} € investicija per 5 metus:\n` +
        `• Galutinė vertė: ${futureValue.toLocaleString("lt-LT", { maximumFractionDigits: 0 })} €\n` +
        `• Bendra grąža: ${totalReturn.toLocaleString("lt-LT", { maximumFractionDigits: 0 })} €\n` +
        `• Metinė grąža: ${annualReturn.toLocaleString("lt-LT", { maximumFractionDigits: 0 })} €`
      );
    }
    
    if (mode === "kwh") {
      // Energy calculator: € → estimated annual kWh production
      // Average cost per kW of solar: ~1000 €
      // Average annual production per kW: 1000 kWh (in Lithuania)
      const costPerKW = 1000; // € per kW installed
      const annualProductionPerKW = 1000; // kWh per kW per year
      
      const installedKW = num / costPerKW;
      const annualProduction = installedKW * annualProductionPerKW;
      const householdsPowered = Math.floor(annualProduction / 3000); // Average household uses 3000 kWh/year
      
      setResult(
        `${num.toLocaleString("lt-LT")} € investicija gali finansuoti:\n` +
        `• ${installedKW.toFixed(1)} kW saulės energijos\n` +
        `• ${annualProduction.toLocaleString("lt-LT", { maximumFractionDigits: 0 })} kWh per metus\n` +
        `• Energija ${householdsPowered} namų ūkiams`
      );
    }
    
    if (mode === "co2") {
      // CO2 savings calculator: € → estimated annual CO2 reduction
      // 1 kWh from solar avoids ~0.4 kg CO2 (compared to grid mix)
      // Average investment produces X kWh → avoids Y CO2
      const costPerKW = 1000; // € per kW installed
      const annualProductionPerKW = 1000; // kWh per kW per year
      const co2PerKwh = 0.4; // kg CO2 avoided per kWh
      
      const installedKW = num / costPerKW;
      const annualProduction = installedKW * annualProductionPerKW;
      const annualCO2Savings = annualProduction * co2PerKwh; // kg
      const carsEquivalent = annualCO2Savings / 2000; // Average car emits 2 tons CO2/year
      const treesEquivalent = annualCO2Savings / 22; // Average tree absorbs 22 kg CO2/year
      
      setResult(
        `${num.toLocaleString("lt-LT")} € investicija gali:\n` +
        `• Sutaupyti ${annualCO2Savings.toLocaleString("lt-LT", { maximumFractionDigits: 0 })} kg CO₂ per metus\n` +
        `• Kompensuoti ${carsEquivalent.toFixed(1)} automobilio emisijas\n` +
        `• Atitinka ${treesEquivalent.toLocaleString("lt-LT", { maximumFractionDigits: 0 })} medžių pasodinimą`
      );
    }
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
    <div className="w-[90%] md:w-[1100px] mt-16 mb-16 bg-white border border-[#CFE8DA] rounded-3xl shadow-sm">
      
      {/* --- TABS --- */}
      <div className="grid grid-cols-3  text-center font-medium text-gray-700">
        <div
          onClick={() => setTab("eur")}
          className={`py-3 cursor-pointer transition ${tab === "eur" ? "bg-white border-t-2 border-green-600" : "bg-[#E1F5EA]"}`}
        >
          Investicijų skaičiuoklė
        </div>

        <div
          onClick={() => setTab("kwh")}
          className={`py-3 cursor-pointer transition ${tab === "kwh" ? "bg-white border-t-2 border-green-600" : "bg-[#E1F5EA]"}`}
        >
          Energijos gamybos skaičiuoklė
        </div>

        <div
          onClick={() => setTab("co2")}
          className={`py-3 cursor-pointer transition ${tab === "co2" ? "bg-white border-t-2 border-green-600" : "bg-[#E1F5EA]"}`}
        >
          CO₂ sutaupymo skaičiuoklė
        </div>
      </div>

      {/* --- CALCULATOR BOX --- */}
      <div className="px-10 py-10 text-left">
        <h2 className="text-2xl font-semibold mb-6">
          {tab === "eur" && "Apskaičiuokite savo investicijos potencialą"}
          {tab === "kwh" && "Kiek energijos galite pagaminti"}
          {tab === "co2" && "Kiek CO₂ galite sutaupyti"}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT INPUT */}
          <div>
            <p className="font-medium mb-2">
              {tab === "eur" && "Įveskite investicijos sumą (€)"}
              {tab === "kwh" && "Įveskite investicijos sumą (€)"}
              {tab === "co2" && "Įveskite investicijos sumą (€)"}
            </p>

            <input
              type="number"
              value={amount}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="pvz., 5000"
              className="bg-white border border-[#B8DCC8] rounded-2xl px-5 py-4 text-xl w-full outline-none"
              min="100"
              step="100"
            />
            
            <div className="mt-4 text-sm text-gray-600">
              {tab === "eur" && "Peržiūrėkite galimą grąžą iš žaliosios energijos investicijų"}
              {tab === "kwh" && "Sužinokite, kiek švarios energijos galite pagaminti"}
              {tab === "co2" && "Įvertinkite savo investicijos poveikį klimato kaitai"}
            </div>
            
            {/* Example amounts */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Greiti pavyzdžiai:</p>
              <div className="flex flex-wrap gap-2">
                {[1000, 5000, 10000, 25000, 50000].map((exampleAmount) => (
                  <button
                    key={exampleAmount}
                    onClick={() => {
                      setAmount(exampleAmount.toString());
                      calculate(exampleAmount.toString(), tab);
                    }}
                    className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
                  >
                    {exampleAmount.toLocaleString()} €
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT OUTPUT */}
          <div>
            <p className="font-medium mb-2">Rezultatas</p>
            <div className="bg-white border border-[#B8DCC8] rounded-2xl px-5 py-4 min-h-[200px] whitespace-pre-line">
              {result || 
                (tab === "eur" 
                  ? "Įveskite investicijos sumą, kad pamatytumėte galimą grąžą" 
                  : tab === "kwh"
                  ? "Įveskite investicijos sumą, kad sužinotumėte, kiek energijos galite pagaminti"
                  : "Įveskite investicijos sumą, kad apskaičiuotumėte CO₂ sutaupymą")}
            </div>
            
            {/* Additional info */}
            <div className="mt-4 text-sm text-gray-500">
              <p>
                {tab === "eur" && "※ Skaičiavimai pagal 7.5% vidutinę metinę grąžą (5 metų laikotarpiui)"}
                {tab === "kwh" && "※ Skaičiavimai pagal 1000 €/kW saulės energijos sistemos kainą"}
                {tab === "co2" && "※ Skaičiavimai pagal 0.4 kg CO₂ sutaupymą už kiekvieną pagamintą kWh"}
              </p>
              <p className="mt-1 text-xs">
                Skaičiavimai yra orientaciniai. Tikslūs rezultatai gali skirtis priklausomai nuo projekto specifikos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}