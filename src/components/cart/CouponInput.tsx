// src/components/cart/CouponInput.tsx
'use client';

import { useState } from 'react';
import { Tag, X, Check, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCouponSuccessMessage } from '@/lib/utils/coupon.utils';

export default function CouponInput() {
    const { appliedCoupon, couponDiscount, applyCoupon, removeCoupon } = useCart();

    const [code, setCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyCoupon = async (): Promise<void> => {
        if (!code.trim()) return;

        setIsLoading(true);
        setError(null);

        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 500));

        const result = applyCoupon(code.trim());

        if (result.success) {
            setCode('');
        } else {
            setError(result.error || 'Cupom inválido');
        }

        setIsLoading(false);
    };

    const handleRemoveCoupon = (): void => {
        removeCoupon();
        setError(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter') {
            handleApplyCoupon();
        }
    };

    // Se já tem cupom aplicado
    if (appliedCoupon) {
        return (
            <div className="bg-[#E6F7F4] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00A082] rounded-full flex items-center justify-center">
                            <Check size={20} className="text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-[#00A082]">
                                {appliedCoupon.code}
                            </p>
                            <p className="text-sm text-gray-600">
                                {formatCouponSuccessMessage(couponDiscount)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleRemoveCoupon}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remover cupom"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
                <Tag size={24} className="text-gray-400 shrink-0" />

                <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite seu cupom"
                    className="flex-1 text-sm font-medium placeholder:text-gray-400 focus:outline-none"
                    disabled={isLoading}
                />

                <button
                    onClick={handleApplyCoupon}
                    disabled={!code.trim() || isLoading}
                    className="px-4 py-2 bg-[#00A082] text-white text-sm font-semibold rounded-full hover:bg-[#008F74] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        'Aplicar'
                    )}
                </button>
            </div>

            {/* Erro */}
            {error && (
                <p className="text-red-500 text-sm mt-2 ml-9">{error}</p>
            )}
        </div>
    );
}