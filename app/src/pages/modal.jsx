import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSun,
    faCloud,
    faCloudRain,
    faWind,
    faTint,
    faMapMarkerAlt,
    faThermometerHalf
} from "@fortawesome/free-solid-svg-icons";

const weatherIcons = {
    sun: faSun,
    cloud: faCloud,
    rain: faCloudRain,
    wind: faWind,
    humidity: faTint,
    location: faMapMarkerAlt,
    default: faThermometerHalf
};

export default function Modal({ isOpen, onClose, title, modalData }) {
    if (!isOpen) return null;
    const getWeatherIcon = (desc) => {
        if (!desc) return weatherIcons.default;
        if (desc.toLowerCase().includes("sol")) return weatherIcons.sun;
        if (desc.toLowerCase().includes("nuvem")) return weatherIcons.cloud;
        if (desc.toLowerCase().includes("chuva")) return weatherIcons.rain;
        return weatherIcons.default;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-10 relative">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    ✕
                </button>

                {title && (
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={getWeatherIcon(modalData?.description)} size="lg" />
                        <span>{title}</span>
                    </h2>
                )}

                {modalData && (
                    <div className="grid grid-cols-2 gap-8 items-center">
                        <div className="flex flex-col items-center justify-center bg-blue-50 rounded-xl p-8 shadow">
                            <FontAwesomeIcon icon={getWeatherIcon(modalData.description)} size="4x" className="text-blue-600" />
                            <span className="text-5xl font-bold text-blue-700 mt-4">{modalData.temperature}°C</span>
                            <span className="text-lg text-gray-600 mt-2">{modalData.description}</span>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow">
                                <FontAwesomeIcon icon={weatherIcons.humidity} size="2x" className="text-blue-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Umidade</p>
                                    <p className="text-xl font-semibold text-blue-600">{modalData.humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow">
                                <FontAwesomeIcon icon={weatherIcons.wind} size="2x" className="text-blue-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Vento</p>
                                    <p className="text-xl font-semibold text-blue-600">{modalData.windSpeed} km/h</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow">
                                <FontAwesomeIcon icon={weatherIcons.location} size="2x" className="text-blue-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Localização</p>
                                    <p className="text-xl font-semibold text-gray-700">{modalData.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
