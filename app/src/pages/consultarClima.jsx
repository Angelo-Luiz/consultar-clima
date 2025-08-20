import React, {useState} from "react";
import CepService from "../service/CepService.js";
import Modal from './Modal.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function ConsultarClima() {
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const formatarCEP = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, "");
        return apenasNumeros.replace(/(\d{5})(\d{3})/, "$1-$2");
    };

    const getCity = async (cep) => {
        const data = await CepService.getCity(cep);
        if (data?.localidade) {
            setCidade(data.localidade);
        }
    };

    const getClimate = async () => {
        if (!cidade.trim()) {
            alert("Por favor, informe uma cidade!");
            return;
        }
        setLoading(true);
        try {
            const response = await CepService.getCityClimate(cidade);
            if (response.status === "success") {
                setModalData({
                    temperature: response.data.current.temperature,
                    humidity: response.data.current.humidity,
                    windSpeed: response.data.current.wind_speed,
                    description: response.data.current.weather_descriptions?.[0],
                    location: `${response.data.location.name}, ${response.data.location.country}`,
                    weatherCode: response.data.current.weather_code
                });
                setIsModalOpen(true);
            }
        } catch (error) {
            alert("Erro ao buscar clima");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                    <i className="fas fa-search mr-2"></i>Consultar Clima
                </h2>
                <p className="text-gray-300">
                    Digite o CEP ou a cidade para consultar o clima atual
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Campo CEP + botão */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                        <i className="fas fa-map-marker-alt mr-2"></i>CEP
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="00000-000"
                            value={cep}
                            maxLength="9"
                            onChange={(e) => setCep(formatarCEP(e.target.value))}
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/20 transition-all backdrop-blur-sm"
                        />
                        <button
                            onClick={() => getCity(cep)}
                            disabled={loading}
                            className={`px-4 py-3 rounded-lg font-semibold ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <FontAwesomeIcon icon={faSearch} className="mr-2 text-white" />
                        </button>
                    </div>
                </div>

                {/* Campo Cidade */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                        <i className="fas fa-city mr-2"></i>Cidade
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Nome da cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white/20 transition-all backdrop-blur-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Botão de busca clima */}
            <div className="text-center pt-4">
                <button
                    onClick={() => getClimate()}
                    className={`px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform ${
                        loading || !cidade.trim()
                            ? "bg-gray-600/50 text-gray-400"
                            : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:scale-105"
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center space-x-3">
                            <div
                                className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            <span>Buscando clima...</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <span>Buscar Clima</span>
                        </div>
                    )}
                </button>
            </div>
            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Dados da cidade"
                modalData={modalData}
            />
        </div>
    )
}
