// src/components/checkout/PaymentForm.tsx
'use client';

import { CreditCard } from 'lucide-react';
import { PaymentMethod } from '@/types';
import { PAYMENT_OPTIONS, CHECKOUT_MESSAGES } from '@/lib/constants/checkout.constants';

interface PaymentFormProps {
    selectedMethod: PaymentMethod | null;
    changeFor: string;
    error?: string;
    onMethodChange: (method: PaymentMethod) => void;
    onChangeForChange: (value: string) => void;
}

export default function PaymentForm({
                                        selectedMethod,
                                        changeFor,
                                        error,
                                        onMethodChange,
                                        onChangeForChange,
                                    }: PaymentFormProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50">
                <div className="w-10 h-10 bg-[#00A082] rounded-full flex items-center justify-center">
                    <CreditCard size={20} className="text-white" />
                </div>
                <h2 className="font-bold text-lg">{CHECKOUT_MESSAGES.paymentTitle}</h2>
            </div>

            {/* Opções de pagamento */}
            <div className="p-4 space-y-3">
                {PAYMENT_OPTIONS.map((option) => (
                    <label
                        key={option.value}
                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                            selectedMethod === option.value
                                ? 'border-[#00A082] bg-[#E6F7F4]'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <input
                            type="radio"
                            name="paymentMethod"
                            value={option.value}
                            checked={selectedMethod === option.value}
                            onChange={() => onMethodChange(option.value)}
                            className="sr-only"
                        />

                        {/* Ícone */}
                        <span className="text-2xl">{option.icon}</span>

                        {/* Info */}
                        <div className="flex-1">
                            <p className="font-medium">{option.label}</p>
                            {option.description && (
                                <p className="text-sm text-gray-500">{option.description}</p>
                            )}
                        </div>

                        {/* Radio visual */}
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedMethod === option.value
                                    ? 'border-[#00A082]'
                                    : 'border-gray-300'
                            }`}
                        >
                            {selectedMethod === option.value && (
                                <div className="w-3 h-3 rounded-full bg-[#00A082]" />
                            )}
                        </div>
                    </label>
                ))}

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                {/* Campo de troco (só aparece se for dinheiro) */}
                {selectedMethod === 'CASH' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {CHECKOUT_MESSAGES.changeFor}
                        </label>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-500">R$</span>
                            <input
                                type="number"
                                value={changeFor}
                                onChange={(e) => onChangeForChange(e.target.value)}
                                placeholder={CHECKOUT_MESSAGES.changeForPlaceholder}
                                min="0"
                                step="0.01"
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082]"
                            />
                        </div>
                        <label className="flex items-center gap-2 mt-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={changeFor === ''}
                                onChange={(e) => onChangeForChange(e.target.checked ? '' : '0')}
                                className="w-4 h-4 rounded border-gray-300 text-[#00A082] focus:ring-[#00A082]"
                            />
                            <span className="text-sm text-gray-600">
                {CHECKOUT_MESSAGES.noChangeNeeded}
              </span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}