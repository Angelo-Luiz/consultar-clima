import { useState } from "react";

export default function Historico() {
    // Dados de exemplo para o histórico
    const [historico] = useState([
        {
            id: 1,
            cidade: "São Paulo",
            estado: "SP",
            temperatura: 25,
            descricao: "Ensolarado",
            data: "15/08/2024 14:30"
        },
        {
            id: 2,
            cidade: "Rio de Janeiro",
            estado: "RJ",
            temperatura: 28,
            descricao: "Parcialmente nublado",
            data: "15/08/2024 13:15"
        },
        {
            id: 3,
            cidade: "Belo Horizonte",
            estado: "MG",
            temperatura: 22,
            descricao: "Nublado",
            data: "15/08/2024 12:00"
        }
    ]);

    const limparHistorico = () => {
        if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
            alert("Histórico limpo! (Esta é apenas uma simulação)");
        }
    };

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
                
                {historico.length > 0 && (
                    <button
                        onClick={limparHistorico}
                        className="px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center space-x-2 backdrop-blur-sm border border-red-500/30 hover:shadow-lg hover:shadow-red-500/25"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        <span>Limpar</span>
                    </button>
                )}
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
                    {historico.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <h3 className="text-xl font-semibold text-white">
                                            🏙️ {item.cidade}
                                        </h3>
                                        {item.estado && (
                                            <span className="px-2 py-1 text-xs font-medium text-blue-300 bg-blue-500/20 rounded-full border border-blue-500/30">
                                                {item.estado}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-300 mb-2 flex items-center">
                                        <span className="mr-2">☁️</span>
                                        {item.descricao}
                                    </p>
                                    <p className="text-sm text-gray-400 flex items-center">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {item.data}
                                    </p>
                                </div>
                                
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-blue-400 mb-1">
                                        {item.temperatura}°C
                                    </div>
                                    <div className="text-xs text-gray-400 uppercase tracking-wide">
                                        Temperatura
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Estatísticas do histórico */}
            {historico.length > 0 && (
                <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                    <div className="flex justify-center items-center space-x-8 text-sm">
                        <div className="text-center">
                            <div className="text-lg font-bold text-blue-400">{historico.length}</div>
                            <div className="text-gray-400">Consultas</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-green-400">
                                {Math.round(historico.reduce((acc, item) => acc + item.temperatura, 0) / historico.length)}°C
                            </div>
                            <div className="text-gray-400">Temp. Média</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-yellow-400">
                                {Math.max(...historico.map(item => item.temperatura))}°C
                            </div>
                            <div className="text-gray-400">Máxima</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
