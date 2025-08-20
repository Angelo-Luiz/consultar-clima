import { useState } from "react";
import "./index.css";
import ConsultarClima from "./pages/consultarClima.jsx";
import Historico from "./pages/historico.jsx";

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState("consultar");

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              ⛅ Consulta de Clima
            </h1>
            <p className="text-gray-400">
              Descubra o clima atual de qualquer cidade
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">

            {/* Abas de navegação */}
            <div className="flex bg-black/20">
              <button
                onClick={() => setTelaAtiva("consultar")}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 relative ${
                  telaAtiva === "consultar"
                    ? "text-white bg-blue-600/80"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <span>Consultar Clima</span>
                </div>
                {telaAtiva === "consultar" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
                )}
              </button>

              <button
                onClick={() => setTelaAtiva("historico")}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 relative ${
                  telaAtiva === "historico"
                    ? "text-white bg-green-600/80"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Histórico</span>
                </div>
                {telaAtiva === "historico" && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-400"></div>
                )}
              </button>
            </div>

            {/* Conteúdo das abas */}
            <div className="p-8">
              <div className="transition-all duration-300 ease-in-out">
                {telaAtiva === "consultar" && <ConsultarClima />}
                {telaAtiva === "historico" && <Historico />}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">

          </div>
        </div>
      </div>
    </div>
  );
}

