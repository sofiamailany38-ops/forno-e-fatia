import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { PizzaItem, DrinkItem, CartItem, PizzaSize } from './types';
import { Flame, Heart, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation: 'home' | 'menu'
  const [activeView, setActiveView] = useState<'home' | 'menu'>('home');
  
  // Shopping cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('forno_fatia_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem('forno_fatia_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item: PizzaItem | DrinkItem, isPizza: boolean, size?: PizzaSize) => {
    const cartId = isPizza ? `${item.id}-${size}` : item.id;
    const price = isPizza && size ? (item as PizzaItem).prices[size] : (item as DrinkItem).price;

    setCartItems(prevItems => {
      const existing = prevItems.find(i => i.id === cartId);
      if (existing) {
        return prevItems.map(i => 
          i.id === cartId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [
          ...prevItems,
          {
            id: cartId,
            productId: item.id,
            name: item.name,
            category: isPizza ? 'pizza' : 'bebida',
            size: size,
            price: price,
            quantity: 1,
            image: item.image
          }
        ];
      }
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50/20 text-gray-800 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Universal Header */}
      <Header 
        activeView={activeView} 
        onNavigate={setActiveView} 
        cartCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeView === 'home' ? (
          <div>
            {/* Elegant Pizzeria Presentation Hero */}
            <Hero onNavigateToMenu={() => setActiveView('menu')} />

            {/* Core Values / Features section */}
            <section className="py-16 bg-white border-y border-orange-100/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <h3 className="font-serif text-3xl font-black text-gray-900">
                    O Segredo do Nosso <span className="text-orange-500">Sabor</span>
                  </h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-3 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-orange-50/30 border border-orange-100/50 p-8 rounded-3xl text-center">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-5">
                      <Flame className="w-6 h-6 fill-orange-500" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-gray-900 mb-2">Forno a Lenha Legítimo</h4>
                    <p className="text-sm text-gray-500 font-sans leading-relaxed">
                      Pizzas assadas a mais de 450°C no forno de pedra vulcânica alimentado com lenha ecológica, garantindo aquela borda perfeitamente defumada e crocante.
                    </p>
                  </div>

                  <div className="bg-orange-50/30 border border-orange-100/50 p-8 rounded-3xl text-center">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-5">
                      <Sparkles className="w-6 h-6 text-orange-500" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-gray-900 mb-2">48h de Fermentação</h4>
                    <p className="text-sm text-gray-500 font-sans leading-relaxed">
                      Nossa massa italiana de fermentação natural repousa fria por 48 horas. O resultado? Uma pizza extremamente leve, de digestão fácil e sabor incomparável.
                    </p>
                  </div>

                  <div className="bg-orange-50/30 border border-orange-100/50 p-8 rounded-3xl text-center">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-5">
                      <Heart className="w-6 h-6 text-red-500 fill-red-100" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-gray-900 mb-2">Ingredientes Selecionados</h4>
                    <p className="text-sm text-gray-500 font-sans leading-relaxed">
                      Molho de tomates San Marzano importados da Itália, azeite extra virgem de oliva, queijos de pequenos produtores e ervas frescas colhidas diariamente.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div>
            {/* Menu and Beverage View with interactive selections */}
            <Menu 
              onAddToCart={handleAddToCart} 
            />
          </div>
        )}
      </main>

      {/* Universal Footer with real business info */}
      <Footer />

      {/* Sliding Shopping Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout details Form Modal & WhatsApp Dispatch */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
