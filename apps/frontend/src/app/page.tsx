"use client";

import { useState } from "react";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "home" && (
          <div className="text-center">
            {/* Hero Section */}
            <div className="mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Frontend Moderno con
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Next.js
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Una aplicación web moderna desarrollada con las mejores
                tecnologías del mercado. Next.js, TypeScript, Tailwind CSS y
                más.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Comenzar Ahora
                </button>
                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                  Ver Documentación
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  100%
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  TypeScript
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  99+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Puntuación Lighthouse
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                <div className="text-gray-600 dark:text-gray-400">
                  Posibilidades
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Características Principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon="⚡"
                title="Rendimiento Óptimo"
                description="Optimización automática con Next.js para la mejor experiencia de usuario."
                iconColor="bg-blue-100 dark:bg-blue-900"
              />
              <FeatureCard
                icon="🎨"
                title="Diseño Moderno"
                description="Interfaz elegante y responsive con Tailwind CSS."
                iconColor="bg-green-100 dark:bg-green-900"
              />
              <FeatureCard
                icon="🔒"
                title="Type Safety"
                description="Desarrollo seguro y confiable con TypeScript."
                iconColor="bg-purple-100 dark:bg-purple-900"
              />
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Acerca del Proyecto
            </h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Este frontend fue desarrollado como parte de un desafío técnico,
                demostrando las mejores prácticas en desarrollo web moderno.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Tecnologías Utilizadas:
              </h3>
              <ul className="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
                <li>• Next.js 15</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Turbo Monorepo</li>
                <li>• ESLint</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>
              &copy; 2024 Technical Challenge. Construido con Next.js y Tailwind
              CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
