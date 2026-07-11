import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  if (!isOpen) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 5.00; // Fictitious flat delivery fee to make it realistic
  const totalOrder = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        id="cart-drawer-backdrop"
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div id="cart-drawer-panel" className="w-screen max-w-md bg-white flex flex-col shadow-2xl h-full">
          
          {/* Header */}
          <div className="px-6 py-5 bg-gradient-to-r from-red-600 to-orange-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="font-serif text-xl font-bold">Seu Carrinho</h3>
              <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold">
                {totalItems} {totalItems === 1 ? 'item' : 'itens'}
              </span>
            </div>
            <button 
              id="close-cart-btn"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white/95 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div id="empty-cart-state" className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-lg font-bold text-gray-800">Carrinho Vazio</h4>
                <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                  Que tal rechear seu carrinho com uma de nossas deliciosas pizzas artesanais recém-saídas do forno?
                </p>
                <button
                  id="empty-cart-shop-now-btn"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 cursor-pointer"
                >
                  Ver Cardápio
                </button>
              </div>
            ) : (
              <div className="divide-y divide-orange-100/50">
                {cartItems.map((item) => (
                  <div key={item.id} id={`cart-item-${item.id}`} className="py-4 flex gap-4 items-start first:pt-0">
                    {/* Item Details */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <h5 className="font-bold text-sm text-gray-900 truncate">
                          {item.name}
                        </h5>
                        <button
                          id={`remove-item-${item.id}`}
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.size && (
                        <span className="text-[10px] font-black uppercase text-orange-500 tracking-wider">
                          Tamanho: {item.size === 'pequena' ? 'Pequena (4f)' : item.size === 'media' ? 'Média (8f)' : 'Grande (12f)'}
                        </span>
                      )}

                      <div className="flex justify-between items-center mt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-orange-100 bg-orange-50/50 rounded-xl px-1.5 py-0.5">
                          <button
                            id={`qty-minus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-red-600 hover:bg-orange-100/50 rounded-md cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold text-gray-800 px-2.5">
                            {item.quantity}
                          </span>
                          <button
                            id={`qty-plus-${item.id}`}
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-red-600 hover:bg-orange-100/50 rounded-md cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Item total price */}
                        <span className="font-mono text-sm font-black text-gray-800">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div id="cart-summary-footer" className="border-t border-orange-100 bg-orange-50/30 p-6 space-y-4">
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    Taxa de Entrega
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-md font-bold">Fixo</span>
                  </span>
                  <span className="font-mono font-semibold">R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="h-px bg-orange-100/50 my-1"></div>
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span className="font-mono text-lg font-black text-red-600">
                    R$ {totalOrder.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-black text-base hover:from-red-500 hover:to-orange-400 shadow-md cursor-pointer"
              >
                Finalizar Pedido
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
