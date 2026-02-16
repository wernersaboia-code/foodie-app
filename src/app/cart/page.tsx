// src/app/cart/page.tsx
'use client';

import { useCart } from '@/hooks/useCart';
import { getRestaurantById } from '@/data/mock';
import { formatPrice } from '@/lib/utils/format.utils';
import CartHeader from '@/components/cart/CartHeader';
import CartRestaurantInfo from '@/components/cart/CartRestaurantInfo';
import CartItemCard from '@/components/cart/CartItemCard';
import CouponInput from '@/components/cart/CouponInput';
import CartSummary from '@/components/cart/CartSummary';
import CartEmpty from '@/components/cart/CartEmpty';
import Link from 'next/link';

export default function CartPage() {
    const { items, restaurantId, totalPrice, couponDiscount, appliedCoupon } = useCart();

    const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;
    const deliveryFee = restaurant?.deliveryFee || 0;

    // Verificar frete grátis
    const isFreeDeliveryCoupon = appliedCoupon?.code === 'FRETEGRATIS';
    const actualDeliveryFee = isFreeDeliveryCoupon ? 0 : deliveryFee;

    const finalTotal = totalPrice + actualDeliveryFee - couponDiscount;

    // Carrinho vazio
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <CartHeader />
                <CartEmpty />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            <CartHeader />

            <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
                {/* Info do Restaurante */}
                {restaurant && <CartRestaurantInfo restaurant={restaurant} />}

                {/* Itens do Carrinho */}
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <CartItemCard key={`${item.menuItem.id}-${index}`} item={item} />
                    ))}
                </div>

                {/* Adicionar mais itens */}
                {restaurant && (
                    <Link
                        href={`/restaurant/${restaurant.id}`}
                        className="block text-center py-4 text-[#00A082] font-semibold hover:underline"
                    >
                        + Adicionar mais itens
                    </Link>
                )}

                {/* Cupom */}
                <CouponInput />

                {/* Resumo */}
                <CartSummary />
            </main>

            {/* Footer Fixo */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/checkout"
                        className="block w-full bg-[#00A082] text-white py-4 rounded-full font-semibold hover:bg-[#008F74] transition-colors text-center"
                    >
                        Ir para pagamento • {formatPrice(Math.max(0, finalTotal))}
                    </Link>
                </div>
            </div>
        </div>
    );
}