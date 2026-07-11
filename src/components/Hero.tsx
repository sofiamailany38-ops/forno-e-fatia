import React from 'react';
import { ArrowRight, Flame, Heart, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  onNavigateToMenu: () => void;
}

export default function Hero({ onNavigateToMenu }: HeroProps) {
  return (
    <div id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-white py-12 sm:py-20">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-red-100 rounded-full filter blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-red-500" />
            Forno de Pedra & Lenha Ecológica
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-black tracking-tight text-gray-900 leading-none">
            Forno <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-amber-500">&</span> Fatia
          </h1>

          <p className="font-sans text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl">
            Na Forno & Fatia, cada pizza é preparada com ingredientes selecionados, massa artesanal e muito sabor. Trabalhamos com receitas especiais para transformar cada momento em uma experiência deliciosa.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              id="hero-view-menu-btn"
              onClick={onNavigateToMenu}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-lg hover:from-red-500 hover:to-orange-400 shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              Ver Cardápio
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-orange-100 bg-orange-50/40 text-sm font-semibold text-orange-700">
              <Clock className="w-4 h-4 text-orange-500" />
              Entrega Rápida: 30 a 45 min
            </div>
          </div>

          {/* Quality badges */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-orange-100/70 w-full max-w-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="p-2 rounded-xl bg-orange-100/50 text-orange-600 mb-2">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-gray-800">Forno de Pedra</h4>
              <p className="text-xs text-gray-500 mt-0.5">Assado perfeito</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-2 rounded-xl bg-orange-100/50 text-orange-600 mb-2">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-gray-800">100% Artesanal</h4>
              <p className="text-xs text-gray-500 mt-0.5">Fermentação lenta</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="p-2 rounded-xl bg-orange-100/50 text-orange-600 mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-sm font-bold text-gray-800">Premium</h4>
              <p className="text-xs text-gray-500 mt-0.5">Ingredientes frescos</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
