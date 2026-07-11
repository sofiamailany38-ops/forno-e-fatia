import React, { useState } from 'react';
import { CartItem, OrderDetails, PaymentMethod } from '../types';
import { X, Send, CreditCard, Coins, CheckSquare, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export default function CheckoutModal({ isOpen, onClose, cartItems, onClearCart }: CheckoutModalProps) {
  if (!isOpen) return null;

  // Form states
  const [formData, setFormData] = useState<OrderDetails>({
    nome: '',
    telefone: '',
    endereco: '',
    complemento: '',
    bairro: '',
    observacoes: '',
    formaPagamento: 'pix',
    trocoPara: ''
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setFormData(prev => ({
      ...prev,
      formaPagamento: method,
      // Clear change if not cash
      trocoPara: method === 'dinheiro' ? prev.trocoPara : ''
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.nome.trim()) errors.nome = 'O nome é obrigatório';
    if (!formData.telefone.trim()) errors.telefone = 'O telefone de contato é obrigatório';
    if (!formData.endereco.trim()) errors.endereco = 'O endereço de entrega é obrigatório';
    if (!formData.bairro.trim()) errors.bairro = 'O bairro é obrigatório';
    
    if (formData.formaPagamento === 'dinheiro' && formData.trocoPara) {
      const trocoVal = parseFloat(formData.trocoPara.replace(',', '.'));
      const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      const deliveryFee = 5.00;
      const total = subtotal + deliveryFee;
      
      if (isNaN(trocoVal)) {
        errors.trocoPara = 'Insira um valor numérico válido';
      } else if (trocoVal < total) {
        errors.trocoPara = `O valor do troco deve ser maior que o total (R$ ${total.toFixed(2).replace('.', ',')})`;
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Calculation
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = 5.00;
    const totalOrder = subtotal + deliveryFee;

    // Format payment string
    const payMap: Record<PaymentMethod, string> = {
      pix: 'PIX ⚡',
      credito: 'Cartão de Crédito 💳',
      debito: 'Cartão de Débito 💳',
      dinheiro: 'Dinheiro 💵'
    };

    // Format products text
    const productsText = cartItems.map(item => {
      const sizeText = item.size ? ` (${item.size === 'pequena' ? 'P' : item.size === 'media' ? 'M' : 'G'})` : '';
      return `• ${item.quantity}x ${item.name}${sizeText} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`;
    }).join('\n');

    // Build message template
    let message = `🍕 *FORNO & FATIA - NOVO PEDIDO* 🍕\n\n`;
    message += `👤 *CLIENTE*\n`;
    message += `Nome: ${formData.nome}\n`;
    message += `Telefone: ${formData.telefone}\n\n`;

    message += `📍 *ENDEREÇO DE ENTREGA*\n`;
    message += `Endereço: ${formData.endereco}\n`;
    message += `Bairro: ${formData.bairro}\n`;
    if (formData.complemento) message += `Complemento: ${formData.complemento}\n`;
    if (formData.observacoes) message += `Observações: ${formData.observacoes}\n`;
    message += `\n`;

    message += `🛒 *PEDIDO*\n`;
    message += `${productsText}\n\n`;
    
    message += `💵 *RESUMO FINANCEIRO*\n`;
    message += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    message += `Taxa de Entrega: R$ ${deliveryFee.toFixed(2).replace('.', ',')}\n`;
    message += `*Total Geral: R$ ${totalOrder.toFixed(2).replace('.', ',')}*\n\n`;

    message += `💳 *PAGAMENTO*\n`;
    message += `Forma de Pagamento: ${payMap[formData.formaPagamento]}\n`;
    
    if (formData.formaPagamento === 'dinheiro' && formData.trocoPara) {
      const trocoVal = parseFloat(formData.trocoPara.replace(',', '.'));
      const trocoDevido = trocoVal - totalOrder;
      message += `Precisa de troco para: R$ ${trocoVal.toFixed(2).replace('.', ',')}\n`;
      message += `*Troco a levar: R$ ${trocoDevido.toFixed(2).replace('.', ',')}*\n`;
    }

    // Format for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5519998764521&text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset flow / Close modal
    onClearCart();
    onClose();
  };

  // Subtotal for reference inside modal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 5.00;
  const totalOrder = subtotal + deliveryFee;

  return (
    <div id="checkout-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        id="checkout-modal-backdrop"
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Modal Container */}
      <div id="checkout-modal-panel" className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-orange-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-red-600 to-orange-500 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <h3 className="font-serif text-xl font-bold">Finalizar seu Pedido</h3>
          </div>
          <button 
            id="close-checkout-btn"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/95 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body (Scrollable) */}
        <form onSubmit={handleSubmit} id="checkout-form" className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* Order Brief Summary */}
          <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 text-sm">
            <h4 className="font-serif font-bold text-gray-800 mb-2 flex items-center gap-1.5">
              <span>🛒</span> Resumo do Pedido ({cartItems.length} itens)
            </h4>
            <div className="space-y-1.5 font-sans">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-gray-600">
                  <span>{item.quantity}x {item.name}{item.size ? ` (${item.size === 'pequena' ? 'P' : item.size === 'media' ? 'M' : 'G'})` : ''}</span>
                  <span className="font-mono">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
              <div className="h-px bg-orange-200/50 my-2"></div>
              <div className="flex justify-between text-sm font-bold text-gray-800">
                <span>Total com Entrega</span>
                <span className="text-red-600 font-mono">R$ {totalOrder.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-gray-900 border-b border-orange-100 pb-1.5">
              👤 Dados para Entrega
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nome */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600">Nome Completo *</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Ex: Carlos Henrique Martins"
                  className={`px-4 py-3 rounded-xl border font-sans text-sm outline-none ${
                    validationErrors.nome ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-orange-400 bg-gray-50/50'
                  }`}
                />
                {validationErrors.nome && (
                  <span className="text-xs text-red-500 font-medium">{validationErrors.nome}</span>
                )}
              </div>

              {/* Telefone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600">Telefone de Contato *</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="Ex: (19) 99876-4521"
                  className={`px-4 py-3 rounded-xl border font-sans text-sm outline-none ${
                    validationErrors.telefone ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-orange-400 bg-gray-50/50'
                  }`}
                />
                {validationErrors.telefone && (
                  <span className="text-xs text-red-500 font-medium">{validationErrors.telefone}</span>
                )}
              </div>
            </div>

            {/* Endereço */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600">Endereço de Entrega (Rua, Número) *</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleInputChange}
                placeholder="Ex: Rua das Oliveiras, 275"
                className={`px-4 py-3 rounded-xl border font-sans text-sm outline-none ${
                  validationErrors.endereco ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-orange-400 bg-gray-50/50'
                }`}
              />
              {validationErrors.endereco && (
                <span className="text-xs text-red-500 font-medium">{validationErrors.endereco}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bairro */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600">Bairro *</label>
                <input
                  type="text"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleInputChange}
                  placeholder="Ex: Centro"
                  className={`px-4 py-3 rounded-xl border font-sans text-sm outline-none ${
                    validationErrors.bairro ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-orange-400 bg-gray-50/50'
                  }`}
                />
                {validationErrors.bairro && (
                  <span className="text-xs text-red-500 font-medium">{validationErrors.bairro}</span>
                )}
              </div>

              {/* Complemento */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-600">Complemento (Opcional)</label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleInputChange}
                  placeholder="Ex: Bloco A - Apto 34"
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 bg-gray-50/50 font-sans text-sm outline-none"
                />
              </div>
            </div>

            {/* Observações */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-600">Observações do Pedido (Opcional)</label>
              <textarea
                name="observacoes"
                rows={2}
                value={formData.observacoes}
                onChange={handleInputChange}
                placeholder="Ex: Tirar cebola de metade da Calabresa, sem queijo na pizza doce..."
                className="px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 bg-gray-50/50 font-sans text-sm outline-none resize-none"
              />
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-gray-900 border-b border-orange-100 pb-1.5">
              💳 Forma de Pagamento
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* PIX */}
              <button
                type="button"
                onClick={() => handlePaymentSelect('pix')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer ${
                  formData.formaPagamento === 'pix'
                    ? 'border-red-500 bg-red-50/30 text-red-600 font-bold ring-2 ring-red-500/10'
                    : 'border-gray-200 hover:border-orange-200 text-gray-600'
                }`}
              >
                <Sparkles className="w-5 h-5 mb-2 text-orange-500" />
                <span className="text-xs font-sans">PIX</span>
              </button>

              {/* Crédito */}
              <button
                type="button"
                onClick={() => handlePaymentSelect('credito')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer ${
                  formData.formaPagamento === 'credito'
                    ? 'border-red-500 bg-red-50/30 text-red-600 font-bold ring-2 ring-red-500/10'
                    : 'border-gray-200 hover:border-orange-200 text-gray-600'
                }`}
              >
                <CreditCard className="w-5 h-5 mb-2 text-orange-500" />
                <span className="text-xs font-sans">Crédito</span>
              </button>

              {/* Débito */}
              <button
                type="button"
                onClick={() => handlePaymentSelect('debito')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer ${
                  formData.formaPagamento === 'debito'
                    ? 'border-red-500 bg-red-50/30 text-red-600 font-bold ring-2 ring-red-500/10'
                    : 'border-gray-200 hover:border-orange-200 text-gray-600'
                }`}
              >
                <CreditCard className="w-5 h-5 mb-2 text-orange-500" />
                <span className="text-xs font-sans">Débito</span>
              </button>

              {/* Dinheiro */}
              <button
                type="button"
                onClick={() => handlePaymentSelect('dinheiro')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border cursor-pointer ${
                  formData.formaPagamento === 'dinheiro'
                    ? 'border-red-500 bg-red-50/30 text-red-600 font-bold ring-2 ring-red-500/10'
                    : 'border-gray-200 hover:border-orange-200 text-gray-600'
                }`}
              >
                <Coins className="w-5 h-5 mb-2 text-orange-500" />
                <span className="text-xs font-sans">Dinheiro</span>
              </button>
            </div>

            {/* Money Change Input (Conditional) */}
            {formData.formaPagamento === 'dinheiro' && (
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-700">Troco para quanto? (Deixe em branco se não precisar de troco)</label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-gray-500">R$</span>
                  <input
                    type="text"
                    name="trocoPara"
                    value={formData.trocoPara}
                    onChange={handleInputChange}
                    placeholder="Ex: 100,00"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 bg-white font-mono text-sm outline-none"
                  />
                </div>
                {validationErrors.trocoPara && (
                  <span className="text-xs text-red-500 font-medium">{validationErrors.trocoPara}</span>
                )}
              </div>
            )}
          </div>

          {/* Form Actions Footer (Internal bottom of scrollable) */}
          <div className="pt-6 border-t border-orange-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-bold text-center cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="submit-order-btn"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-black text-sm shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Enviar Pedido pelo WhatsApp
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
