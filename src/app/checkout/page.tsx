// src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';
import { getRestaurantById } from '@/data/mock';
import { formatPrice } from '@/lib/utils/format.utils';
import { createOrder } from '@/lib/utils/checkout.utils';
import {
    addressSchema,
    paymentSchema,
    AddressFormData,
} from '@/lib/validations/checkout.validations';
import { PaymentMethod, Address } from '@/types';
import { CHECKOUT_MESSAGES } from '@/lib/constants/checkout.constants';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import AddressForm from '@/components/checkout/AddressForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import CartEmpty from '@/components/cart/CartEmpty';

export default function CheckoutPage() {
    const router = useRouter();
    const {
        items,
        restaurantId,
        totalPrice,
        appliedCoupon,
        couponDiscount,
        clearCart,
    } = useCart();
    const { addOrder } = useOrders();

    // Estado do endereço
    const [addressData, setAddressData] = useState<AddressFormData>({
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: '',
    });
    const [addressErrors, setAddressErrors] = useState<
        Partial<Record<keyof AddressFormData, string>>
    >({});

    // Estado do pagamento
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
        null
    );
    const [changeFor, setChangeFor] = useState<string>('');
    const [paymentError, setPaymentError] = useState<string>('');

    // Estado de loading
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const restaurant = restaurantId ? getRestaurantById(restaurantId) : null;
    const deliveryFee = restaurant?.deliveryFee || 0;

    const isFreeDeliveryCoupon = appliedCoupon?.code === 'FRETEGRATIS';
    const actualDeliveryFee = isFreeDeliveryCoupon ? 0 : deliveryFee;

    const finalTotal = totalPrice + actualDeliveryFee - couponDiscount;

    // Handlers
    const handleAddressChange = (
        field: keyof AddressFormData,
        value: string
    ): void => {
        setAddressData((prev) => ({ ...prev, [field]: value }));
        if (addressErrors[field]) {
            setAddressErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handlePaymentMethodChange = (method: PaymentMethod): void => {
        setPaymentMethod(method);
        setPaymentError('');
        if (method !== 'CASH') {
            setChangeFor('');
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;

        // Validar endereço
        const addressResult = addressSchema.safeParse(addressData);
        if (!addressResult.success) {
            const errors: Partial<Record<keyof AddressFormData, string>> = {};
            addressResult.error.issues.forEach((issue) => {
                const field = issue.path[0] as keyof AddressFormData;
                errors[field] = issue.message;
            });
            setAddressErrors(errors);
            isValid = false;
        }

        // Validar pagamento
        const paymentResult = paymentSchema.safeParse({
            method: paymentMethod,
            changeFor: changeFor ? parseFloat(changeFor) : undefined,
        });
        if (!paymentResult.success) {
            setPaymentError('Selecione uma forma de pagamento');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (): Promise<void> => {
        if (!validateForm()) return;
        if (!restaurant || !paymentMethod) return;

        setIsLoading(true);

        // Simular processamento
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Criar endereço
        const address: Address = {
            id: Date.now().toString(),
            ...addressData,
            complement: addressData.complement || undefined,
        };

        // Criar pedido
        const order = createOrder(
            items,
            address,
            paymentMethod,
            totalPrice,
            actualDeliveryFee,
            couponDiscount,
            restaurant.id,
            restaurant.name,
            restaurant.deliveryTime,
            changeFor ? parseFloat(changeFor) : undefined
        );

        // Salvar pedido
        addOrder(order);

        // Limpar carrinho
        clearCart();

        // Redirecionar para página de confirmação
        router.push(`/order/${order.id}`);
    };

    // Carrinho vazio
    if (items.length === 0) {
        return (
            <div
                className="min-h-screen transition-colors"
                style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
                <CheckoutHeader />
                <CartEmpty />
            </div>
        );
    }

    return (
        <div
            className="min-h-screen pb-32 transition-colors"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
            <CheckoutHeader />

            <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {/* Endereço */}
                <AddressForm
                    data={addressData}
                    errors={addressErrors}
                    onChange={handleAddressChange}
                />

                {/* Pagamento */}
                <PaymentForm
                    selectedMethod={paymentMethod}
                    changeFor={changeFor}
                    error={paymentError}
                    onMethodChange={handlePaymentMethodChange}
                    onChangeForChange={setChangeFor}
                />

                {/* Resumo */}
                <OrderSummary />
            </main>

            {/* Footer Fixo */}
            <div
                className="fixed bottom-0 left-0 right-0 border-t p-4 transition-colors"
                style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border)',
                }}
            >
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full py-4 rounded-full font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-text-inverse)',
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'var(--color-primary-hover)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                'var(--color-primary)')
                        }
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                {CHECKOUT_MESSAGES.processing}
                            </>
                        ) : (
                            <>
                                {CHECKOUT_MESSAGES.confirmButton} •{' '}
                                {formatPrice(Math.max(0, finalTotal))}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}