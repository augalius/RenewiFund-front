import { Leaf, Users, Shield, Globe, TrendingUp, Zap } from "lucide-react";

export function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-6">
          Apie RenewiFund
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Platforma, jungianti investuotojus ir žaliuosius projektus, 
          siekiant kurti tvarų energetinį ateitį kartu.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">Mūsų misija</h3>
          <p className="text-gray-600">
            Demokratizuoti prieigą prie žaliųjų investicijų, suteikiant kiekvienam galimybę 
            investuoti į atsinaujinančios energijos projektus ir kartu kovoti su klimato kaita. 
            Tikime, kad mažos investicijos gali padaryti didelį skirtumą.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">Mūsų vizija</h3>
          <p className="text-gray-600">
            Tapti pagrindine žaliųjų investicijų platforma Lietuvoje, 
            padėti pasiekti ES klimato neutralumo tikslus iki 2050 metų 
            ir sukurti bendruomenę, kurią vienija bendras siekis – tvarus ateities vaizdas.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Kaip tai veikia?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-green-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Projektų prašymo teikimas</h3>
            <p className="text-gray-600">
              Projektų vystytojai pateikia savo žaliuosius projektus mūsų ekspertų
              komandai juos peržiūrėti ir patvirtinti. 
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Projektai įgyvendinami</h3>
            <p className="text-gray-600">
              Peržiūrėkite patikrintus žaliuosius projektus ir investuokite jums tinkamą sumą – nuo 5 €.
              Surinkus reikiamą finansavimą, projektai įgyvendinami.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Gauta grąža ir poveikis</h3>
            <p className="text-gray-600">
              Investicijos suteiks finansinę grąžą ir realų poveikį aplinkai – sutaupytą CO₂, 
              pagamintą švarią energiją.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Mūsų vertybės</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Patikimumas</h4>
            <p className="text-sm text-gray-600">
              Kiekvienas projektas yra kruopščiai patikrintas ekspertų komandos.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Tvarumas</h4>
            <p className="text-sm text-gray-600">
              Skiriame pirmenybę tik žaliems ir tvariemss projektams.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Bendruomenė</h4>
            <p className="text-sm text-gray-600">
              Kuriama bendruomenė, siekianti bendrų tikslų – tvarios ateities.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold mb-2">Inovacijos</h4>
            <p className="text-sm text-gray-600">
              Nuolat ieškome naujų, efektyvesnių būdų gaminti švarią energiją.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 mb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Mūsų pasiekimai</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
            <p className="text-gray-700">Įgyvendinti projektai</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">25 000+</div>
            <p className="text-gray-700">Investuotojų</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">25 000 t</div>
            <p className="text-gray-700">Sutaupyta CO₂</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-white rounded-3xl p-12 shadow-sm border">
        <h2 className="text-3xl font-bold mb-6">Prisijunkite prie mūsų kelionės</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Kartu galime sukurti tvarią ateitį. 
          Nepriklausomai nuo to, ar esate patyręs investuotojas, ar tik pradedate – 
          prisijunkite prie mūsų.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Pradėti investuoti
          </a>
          <a
            href="/projects"
            className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full font-medium transition-colors"
          >
            Peržiūrėti projektus
          </a>
        </div>
      </div>
    </div>
  );
}