// src/components/cart/CartSummary.tsx
'use client';

import { useCart } from '@/hooks/useCart';
import { getRestaurantById } from '@/data/mock';
import { formatPrice } from '@/lib/utils/format.utils';

export default function CartSummary() {
    const { totalPrice, restaurantId, appliedCoupon, couponDiscount } = useCart();

    const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;
    const deliveryFee = restaurant?.deliveryFee || 0;

    // Verificar se o cupom é de frete grátis
    const isFreeDeliveryCoupon = appliedCoupon?.code === 'FRETEGRATIS';
    const actualDeliveryFee = isFreeDeliveryCoupon ? 0 : deliveryFee;

    const finalTotal = totalPrice + actualDeliveryFee - couponDiscount;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
            </div>

            {/* Taxa de entrega */}
            <div className="flex justify-between text-gray-600">
                <span>Taxa de entrega</span>
                <span className={actualDeliveryFee === 0 ? 'text-[#00A082] font-medium' : ''}>
          {actualDeliveryFee === 0 ? 'Grátis' : formatPrice(actualDeliveryFee)}
        </span>
            </div>

            {/* Desconto do cupom */}
            {couponDiscount > 0 && (
                <div className="flex justify-between text-[#00A082]">
                    <span>Desconto ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                </div>
            )}

            {/* Frete grátis do cupom */}
            {isFreeDeliveryCoupon && deliveryFee > 0 && (
                <div className="flex justify-between text-[#00A082]">
                    <span>Frete Grátis ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(deliveryFee)}</span>
                </div>
            )}

            {/* Divisor */}
            <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(Math.max(0, finalTotal))}</span>
                </div>
            </div>
        </div>
    );
}