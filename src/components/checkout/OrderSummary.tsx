// src/components/checkout/OrderSummary.tsx
'use client';

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { getRestaurantById } from '@/data/mock';
import { formatPrice } from '@/lib/utils/format.utils';
import { CHECKOUT_MESSAGES } from '@/lib/constants/checkout.constants';

export default function OrderSummary() {
    const { items, restaurantId, totalPrice, appliedCoupon, couponDiscount } = useCart();

    const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;
    const deliveryFee = restaurant?.deliveryFee || 0;

    const isFreeDeliveryCoupon = appliedCoupon?.code === 'FRETEGRATIS';
    const actualDeliveryFee = isFreeDeliveryCoupon ? 0 : deliveryFee;

    const finalTotal = totalPrice + actualDeliveryFee - couponDiscount;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50">
                <div className="w-10 h-10 bg-[#00A082] rounded-full flex items-center justify-center">
                    <ShoppingBag size={20} className="text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-lg">{CHECKOUT_MESSAGES.summaryTitle}</h2>
                    {restaurant && (
                        <p className="text-sm text-gray-500">{restaurant.name}</p>
                    )}
                </div>
            </div>

            {/* Itens */}
            <div className="p-4 space-y-3">
                {items.map((item, index) => (
                    <div
                        key={`${item.menuItem.id}-${index}`}
                        className="flex items-center gap-3"
                    >
                        {/* Imagem */}
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <Image
                                src={item.menuItem.image}
                                alt={item.menuItem.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                                {item.quantity}x {item.menuItem.name}
                            </p>
                            {item.observation && (
                                <p className="text-xs text-gray-400 truncate">
                                    📝 {item.observation}
                                </p>
                            )}
                        </div>

                        {/* Preço */}
                        <p className="font-medium text-sm">
                            {formatPrice(item.menuItem.price * item.quantity)}
                        </p>
                    </div>
                ))}
            </div>

            {/* Totais */}
            <div className="p-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Taxa de entrega</span>
                    <span className={actualDeliveryFee === 0 ? 'text-[#00A082]' : ''}>
            {actualDeliveryFee === 0 ? 'Grátis' : formatPrice(actualDeliveryFee)}
          </span>
                </div>

                {couponDiscount > 0 && (
                    <div className="flex justify-between text-sm text-[#00A082]">
                        <span>Desconto ({appliedCoupon?.code})</span>
                        <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                )}

                {isFreeDeliveryCoupon && deliveryFee > 0 && (
                    <div className="flex justify-between text-sm text-[#00A082]">
                        <span>Frete Grátis</span>
                        <span>-{formatPrice(deliveryFee)}</span>
                    </div>
                )}

                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{formatPrice(Math.max(0, finalTotal))}</span>
                </div>
            </div>
        </div>
    );
}