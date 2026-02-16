// src/components/cart/CartItemCard.tsx
'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils/format.utils';

interface CartItemCardProps {
    item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
    const { updateQuantity } = useCart();

    const { menuItem, quantity, observation } = item;
    const totalPrice = menuItem.price * quantity;

    const handleDecrease = (): void => {
        updateQuantity(menuItem.id, quantity - 1, observation);
    };

    const handleIncrease = (): void => {
        updateQuantity(menuItem.id, quantity + 1, observation);
    };

    return (
        <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100">
            {/* Imagem */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                <Image
                    src={menuItem.image}
                    alt={menuItem.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{menuItem.name}</h3>

                {/* Observação */}
                {observation && (
                    <p className="text-sm text-gray-400 truncate mt-0.5">
                        📝 {observation}
                    </p>
                )}

                {/* Preço e Controles */}
                <div className="flex items-center justify-between mt-3">
                    <p className="text-[#00A082] font-bold text-lg">
                        {formatPrice(totalPrice)}
                    </p>

                    {/* Controles de quantidade */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDecrease}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            aria-label="Diminuir quantidade"
                        >
                            {quantity === 1 ? (
                                <Trash2 size={16} className="text-red-500" />
                            ) : (
                                <Minus size={16} />
                            )}
                        </button>

                        <span className="font-bold text-lg w-8 text-center">
              {quantity}
            </span>

                        <button
                            onClick={handleIncrease}
                            className="w-8 h-8 rounded-full bg-[#00A082] text-white flex items-center justify-center hover:bg-[#008F74] transition-colors"
                            aria-label="Aumentar quantidade"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}