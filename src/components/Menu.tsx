import React, { useState } from 'react';
import { PIZZAS, DRINKS } from '../data';
import { PizzaItem, DrinkItem, PizzaSize } from '../types';
import { ShoppingCart, Flame, HelpCircle, Check, Info } from 'lucide-react';

interface MenuProps {
  onAddToCart: (item: PizzaItem | DrinkItem, isPizza: boolean, size?: PizzaSize) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  // Store selected size for each pizza ID in a dictionary, default to 'media' (8 slices)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, PizzaSize>>(() => {
    const initial: Record<string, PizzaSize> = {};
    PIZZAS.forEach(p => {
      initial[p.id] = 'media';
    });
    return initial;
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'pizzas' | 'bebidas'>('all');
  const [pizzaFilter, setPizzaFilter] = useState<'all' | 'salgadas' | 'doces'>('all');
  const [successFeedbacks, setSuccessFeedbacks] = useState<Record<string, boolean>>({});

  const handleSizeChange = (pizzaId: string, size: PizzaSize) => {
    setSelectedSizes(prev => ({
      ...prev,
      [pizzaId]: size
    }));
  };

  const handleAddWithFeedback = (item: PizzaItem | DrinkItem, isPizza: boolean, size?: PizzaSize) => {
    onAddToCart(item, isPizza, size);
    
    // Create unique key for feedback
    const feedbackKey = isPizza ? `${item.id}-${size}` : item.id;
    setSuccessFeedbacks(prev => ({ ...prev, [feedbackKey]: true }));
    
    setTimeout(() => {
      setSuccessFeedbacks(prev => ({ ...prev, [feedbackKey]: false }));
    }, 1500);
  };

  // Filter items
  const filteredPizzas = PIZZAS.filter(pizza => {
    if (pizzaFilter === 'salgadas') return !pizza.isSweet;
    if (pizzaFilter === 'doces') return pizza.isSweet;
    return true;
  });

  const pizzaSizesInfo: Record<PizzaSize, { name: string; slices: number }> = {
    pequena: { name: 'Pequena', slices: 4 },
    media: { name: 'Média', slices: 8 },
    grande: { name: 'Grande', slices: 12 }
  };

  return (
    <div id="menu-view" className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Nosso <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Cardápio</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
          <p className="font-sans text-gray-600">
            Selecione entre as nossas massas artesanais salgadas, deliciosas pizzas doces e bebidas geladas para completar o seu momento perfeito.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white border border-orange-100 text-gray-700 hover:bg-orange-50/50'
            }`}
          >
            🍕 Tudo
          </button>
          <button
            onClick={() => setActiveCategory('pizzas')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide cursor-pointer ${
              activeCategory === 'pizzas'
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white border border-orange-100 text-gray-700 hover:bg-orange-50/50'
            }`}
          >
            🍕 Pizzas Artesanais
          </button>
          <button
            onClick={() => setActiveCategory('bebidas')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide cursor-pointer ${
              activeCategory === 'bebidas'
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white border border-orange-100 text-gray-700 hover:bg-orange-50/50'
            }`}
          >
            🥤 Bebidas Geladas
          </button>
        </div>

        {/* Size Guide Card */}
        {(activeCategory === 'all' || activeCategory === 'pizzas') && (
          <div className="mb-8 p-4 rounded-2xl bg-orange-50/50 border border-orange-100 text-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-700 rounded-xl">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-800">Guia de Tamanhos</h4>
                <p className="text-xs text-gray-500">Massa artesanal fina com borda aerada crocante, assada em forno de pedra.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-700">
              <span className="px-3 py-1.5 rounded-lg bg-white border border-orange-200">🍕 Pequena: 4 fatias</span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-orange-200">🍕 Média: 8 fatias</span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-orange-200">🍕 Grande: 12 fatias</span>
            </div>
          </div>
        )}

        {/* Pizzas Section */}
        {(activeCategory === 'all' || activeCategory === 'pizzas') && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-orange-100 pb-4 max-w-7xl mx-auto gap-4">
              <h3 className="font-serif text-2xl font-black text-gray-800 flex items-center gap-2">
                <span className="text-red-500">🍕</span> Sabores de Pizza
              </h3>
              
              {/* Pizza sub-filters */}
              <div className="flex items-center gap-2 bg-orange-50 p-1 rounded-xl border border-orange-100">
                <button
                  onClick={() => setPizzaFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    pizzaFilter === 'all' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setPizzaFilter('salgadas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    pizzaFilter === 'salgadas' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Salgadas
                </button>
                <button
                  onClick={() => setPizzaFilter('doces')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    pizzaFilter === 'doces' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Doces
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPizzas.map((pizza) => {
                const currentSize = selectedSizes[pizza.id] || 'media';
                const currentPrice = pizza.prices[currentSize];
                const feedbackKey = `${pizza.id}-${currentSize}`;
                const hasAdded = successFeedbacks[feedbackKey];

                return (
                  <div
                    key={pizza.id}
                    className="bg-white rounded-3xl border border-orange-100 shadow-md flex flex-col h-full"
                  >
                    {/* Content Body */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-serif text-xl font-bold text-gray-900">
                            {pizza.name}
                          </h4>
                          {pizza.isSweet ? (
                            <span className="shrink-0 bg-pink-100 text-pink-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-pink-200">
                              🍓 Doce
                            </span>
                          ) : (
                            <span className="shrink-0 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-red-100 flex items-center gap-1">
                              <Flame className="w-3 h-3 fill-red-500" /> Lenha
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
                          {pizza.description}
                        </p>
                      </div>

                      {/* Config Options */}
                      <div className="space-y-3">
                        <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tamanho da Pizza:</span>
                        <div className="grid grid-cols-3 gap-2 p-1 bg-orange-50/50 border border-orange-100 rounded-2xl">
                          {(['pequena', 'media', 'grande'] as PizzaSize[]).map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeChange(pizza.id, size)}
                              className={`py-2 rounded-xl text-xs font-bold tracking-tight cursor-pointer ${
                                currentSize === size
                                  ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm'
                                  : 'text-gray-600 hover:bg-orange-100/50'
                              }`}
                            >
                              {size === 'pequena' ? 'P (4f)' : size === 'media' ? 'M (8f)' : 'G (12f)'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-orange-50 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Preço</span>
                          <span className="font-mono text-xl sm:text-2xl font-black text-red-600 mt-1">
                            R$ {currentPrice.toFixed(2).replace('.', ',')}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddWithFeedback(pizza, true, currentSize)}
                          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm cursor-pointer shadow-sm ${
                            hasAdded
                              ? 'bg-green-600 text-white hover:bg-green-500'
                              : 'bg-red-600 hover:bg-red-500 text-white'
                          }`}
                        >
                          {hasAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              Adicionado
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Adicionar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Beverages Section */}
        {(activeCategory === 'all' || activeCategory === 'bebidas') && (
          <div className="space-y-8 mt-16">
            <div className="border-b border-orange-100 pb-4 max-w-7xl mx-auto">
              <h3 className="font-serif text-2xl font-black text-gray-800 flex items-center gap-2">
                <span className="text-orange-500">🥤</span> Bebidas Geladas & Drinks
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DRINKS.map((drink) => {
                const hasAdded = successFeedbacks[drink.id];

                return (
                  <div
                    key={drink.id}
                    className="bg-white rounded-3xl border border-orange-100 shadow-md flex flex-col h-full"
                  >
                    {/* Content Body */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-serif text-lg font-bold text-gray-900">
                            {drink.name}
                          </h4>
                          {drink.name.includes('Caipirinha') || drink.name.includes('Mojito') ? (
                            <span className="shrink-0 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-green-100">
                              🍸 Drink
                            </span>
                          ) : drink.name.includes('Heineken') || drink.name.includes('Budweiser') ? (
                            <span className="shrink-0 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-amber-100">
                              🍺 Cerveja
                            </span>
                          ) : (
                            <span className="shrink-0 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-blue-100">
                              🥤 Refresco
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
                          {drink.description}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-orange-50 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Preço</span>
                          <span className="font-mono text-xl sm:text-2xl font-black text-red-600 mt-1">
                            R$ {drink.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddWithFeedback(drink, false)}
                          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm cursor-pointer shadow-sm ${
                            hasAdded
                              ? 'bg-green-600 text-white hover:bg-green-500'
                              : 'bg-red-600 hover:bg-red-500 text-white'
                          }`}
                        >
                          {hasAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              Adicionado
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Adicionar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
