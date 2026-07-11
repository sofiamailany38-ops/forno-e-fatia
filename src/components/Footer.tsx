import React from 'react';
import { Phone, MapPin, User, Clock, Heart, Pizza, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-zinc-900 text-gray-300 pt-16 pb-12 border-t border-orange-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-md">
                <Pizza className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Forno <span className="text-orange-500">&</span> Fatia
              </span>
            </div>
            
            <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-sm">
              Sabor inigualável assado em forno a lenha artesanal de pedra. Usamos ingredientes selecionados e massa de fermentação lenta de 48h para garantir leveza e crocância únicos.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-orange-500" /> Higiene Certificada
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" /> Feito com Amor
              </span>
            </div>
          </div>

          {/* Column 2: Opening Hours */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wide uppercase border-b border-zinc-800 pb-2">
              📅 Horário de Funcionamento
            </h4>
            <div className="space-y-2 text-sm text-gray-400 font-sans">
              <div className="flex justify-between">
                <span>Terça a Quinta:</span>
                <span className="text-white font-semibold">18:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sexta e Sábado:</span>
                <span className="text-white font-semibold">18:00 - 00:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span className="text-white font-semibold">18:00 - 23:30</span>
              </div>
              <div className="text-xs text-red-400 font-semibold pt-1">
                ⚠️ Segunda-feira: Fechado
              </div>
            </div>
          </div>

          {/* Column 3: Contact and Address (Required Fictional info) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif text-base font-bold text-white tracking-wide uppercase border-b border-zinc-800 pb-2">
              📞 Contato & Endereço
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-400 font-sans">
              
              {/* Telefone */}
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-gray-500 font-bold uppercase">Telefone:</span>
                  <a href="tel:19998764521" className="text-white hover:text-orange-400 font-semibold">
                    (19) 99876-4521
                  </a>
                </div>
              </li>

              {/* Endereço */}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-gray-500 font-bold uppercase">Endereço:</span>
                  <span className="text-white leading-relaxed font-medium">
                    Rua das Oliveiras, 275<br />
                    Centro • Campinas - SP
                  </span>
                </div>
              </li>

              {/* Proprietário */}
              <li className="flex items-start gap-3">
                <User className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-gray-500 font-bold uppercase">Proprietário:</span>
                  <span className="text-white font-medium">
                    Carlos Henrique Martins
                  </span>
                </div>
              </li>

            </ul>
          </div>

        </div>

        {/* Separator */}
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Forno & Fatia. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Massa fresca assada com amor para você • Campinas/SP
          </p>
        </div>
      </div>
    </footer>
  );
}
