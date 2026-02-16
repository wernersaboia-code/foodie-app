// src/components/cart/CartSidebar.tsx
'use client';

import { Minus, Plus, Trash2, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { getRestaurantById } from '@/data/mock';
import { formatPrice } from '@/lib/utils/format.utils';
import { CART_MESSAGES } from '@/lib/constants/cart.constants';
import Link from 'next/link';

export default function CartSidebar() {
    const {
        items,
        restaurantId,
        updateQuantity,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
    } = useCart();

    const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;
    const deliveryFee = restaurant?.deliveryFee || 0;
    const finalTotal = totalPrice + deliveryFee;

    if (items.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="text-center py-8">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">
                        {CART_MESSAGES.emptyCart}
                    </h3>
                    <p className="text-gray-500 text-sm">
                        {CART_MESSAGES.emptyCartDescription}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg">Seu Pedido</h3>
                    {restaurant && (
                        <p className="text-sm text-gray-500">{restaurant.name}</p>
                    )}
                </div>
                <button
                    onClick={() => setIsCartOpen(false)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Fechar carrinho"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Itens */}
            <div className="p-4 max-h-80 overflow-y-auto">
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={`${item.menuItem.id}-${index}`} className="flex gap-3">
                            {/* Imagem */}
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={item.menuItem.image}
                                    alt={item.menuItem.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">
                                    {item.menuItem.name}
                                </h4>

                                {/* Observação */}
                                {item.observation && (
                                    <p className="text-xs text-gray-400 truncate mt-0.5">
                                        📝 {item.observation}
                                    </p>
                                )}

                                <p className="text-[#00A082] font-semibold text-sm">
                                    {formatPrice(item.menuItem.price * item.quantity)}
                                </p>

                                {/* Controles de quantidade */}
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() =>
                                            updateQuantity(item.menuItem.id, item.quantity - 1, item.observation)
                                        }
                                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                        aria-label="Diminuir quantidade"
                                    >
                                        {item.quantity === 1 ? (
                                            <Trash2 size={14} className="text-red-500" />
                                        ) : (
                                            <Minus size={14} />
                                        )}
                                    </button>

                                    <span className="font-medium text-sm w-6 text-center">
                    {item.quantity}
                  </span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(item.menuItem.id, item.quantity + 1, item.observation)
                                        }
                                        className="w-7 h-7 rounded-full bg-[#00A082] text-white flex items-center justify-center hover:bg-[#008F74] transition-colors"
                                        aria-label="Aumentar quantidade"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Resumo */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Taxa de entrega</span>
                        <span className={deliveryFee === 0 ? 'text-[#00A082]' : ''}>
              {formatPrice(deliveryFee)}
            </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>{formatPrice(finalTotal)}</span>
                    </div>
                </div>

                <Link
                    href="/cart"
                    className="block w-full mt-4 bg-[#00A082] text-white py-4 rounded-full font-semibold hover:bg-[#008F74] transition-colors text-center"
                >
                    Finalizar Pedido
                </Link>
            </div>
        </div>
    );
}