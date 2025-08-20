import { useState, useEffect } from "react";
import HistoricoService from "../service/HistoricoService.js";

export default function Historico() {
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        async function fetchHistoric() {
            try {
                const data = await HistoricoService.getHistoric();
                setHistorico(data);
            } catch (error) {
                setHistorico([]);
            }
        }
        fetchHistoric();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        📊 Histórico de Consultas
                    </h2>
                    <p className="text-gray-300">
                        Suas últimas consultas de clima
                    </p>
                </div>

            </div>

            {historico.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-gray-400 mb-6">
                        <svg className="w-20 h-20 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-300 mb-3">
                        📝 Nenhuma consulta realizada
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Suas consultas de clima aparecerão aqui. Faça sua primeira busca na aba "Consultar Clima"!
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {historico.map((item) => {
                        let detalhes;
                        try {
                            detalhes = JSON.parse(item.detalhes);
                        } catch {
                            detalhes = {};
                        }
                        const cidade = detalhes.location?.name || "Cidade desconhecida";
                        const estado = detalhes.location?.region || "";
                        const temperatura = detalhes.current?.temperature ?? "--";
                        const descricao = detalhes.current?.condition?.text || "Sem descrição";
                        const data = item.data_criacao;

                        return (
                            <div
                                key={item.id}
                                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <h3 className="text-xl font-semibold text-white">
                                                🏙️ {cidade}
                                            </h3>
                                            {estado && (
                                                <span className="px-2 py-1 text-xs font-medium text-blue-300 bg-blue-500/20 rounded-full border border-blue-500/30">
                                                    {estado}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-300 mb-2 flex items-center">
                                            <span className="mr-2">☁️</span>
                                            {descricao}
                                        </p>
                                        <p className="text-sm text-gray-400 flex items-center">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            {data}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-blue-400 mb-1">
                                            {temperatura}°C
                                        </div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wide">
                                            Temperatura
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
