import React, { useState } from 'react';
import { Pizza, ShoppingBag, Menu, X, Flame } from 'lucide-react';

interface HeaderProps {
  activeView: 'home' | 'menu';
  onNavigate: (view: 'home' | 'menu') => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ activeView, onNavigate, cartCount, onOpenCart }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'menu', label: 'Cardápio' }
  ] as const;

  const handleNavigate = (view: 'home' | 'menu') => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="app-header" className="sticky top-0 z-40 w-full bg-white border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            id="logo-container"
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-md shadow-orange-500/20">
              <Pizza className="w-5 h-5" />
              <Flame className="absolute -top-1 -right-1 w-4 h-4 text-orange-200 fill-orange-200" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-tight text-gray-900 group-hover:text-red-600">
                Forno <span className="text-orange-500">&</span> Fatia
              </span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-red-500">
                Pizzaria Artesanal
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavigate(item.id)}
                className={`relative py-2 text-base font-medium tracking-wide cursor-pointer ${
                  activeView === item.id 
                    ? 'text-red-600 font-semibold' 
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                {item.label}
                {activeView === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div id="header-actions" className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              id="cart-trigger"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl border border-orange-100 bg-orange-50 hover:bg-orange-100 text-red-600 cursor-pointer shadow-sm flex items-center gap-1"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-[10px] font-black text-white ring-2 ring-white shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-red-500 hover:bg-orange-50 border border-transparent hover:border-orange-100 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden border-t border-orange-50 bg-white shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium cursor-pointer flex items-center justify-between ${
                  activeView === item.id
                    ? 'bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600 border-l-4 border-red-500 font-bold'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                }`}
              >
                {item.label}
                <span className="text-orange-300">→</span>
              </button>
            ))}
            
            {/* Quick Contact Badge in Drawer */}
            <div className="mt-4 p-4 rounded-xl bg-orange-50/50 border border-orange-100/50">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Peça também por telefone</p>
              <p className="text-sm font-bold text-gray-700 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                (19) 99876-4521
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
