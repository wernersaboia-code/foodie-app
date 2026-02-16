// src/app/order/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    CheckCircle,
    Clock,
    MapPin,
    CreditCard,
    ChefHat,
    Bike,
    Package,
    Home
} from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { formatPrice } from '@/lib/utils/format.utils';
import { formatAddress } from '@/lib/utils/checkout.utils';
import { OrderData } from '@/types';

const STATUS_STEPS = [
    { key: 'PENDING', label: 'Pedido recebido', icon: CheckCircle },
    { key: 'CONFIRMED', label: 'Confirmado', icon: CheckCircle },
    { key: 'PREPARING', label: 'Preparando', icon: ChefHat },
    { key: 'READY', label: 'Pronto', icon: Package },
    { key: 'DELIVERING', label: 'Saiu para entrega', icon: Bike },
    { key: 'DELIVERED', label: 'Entregue', icon: Home },
];

export default function OrderPage() {
    const params = useParams();
    const router = useRouter();
    const { getOrderById, updateOrderStatus, isHydrated } = useOrders();

    const [order, setOrder] = useState<OrderData | null>(null);

    const orderId = params.id as string;

    useEffect(() => {
        if (isHydrated) {
            const foundOrder = getOrderById(orderId);
            if (foundOrder) {
                setOrder(foundOrder);
            }
        }
    }, [isHydrated, orderId, getOrderById]);

    // Simular progressão do status
    useEffect(() => {
        if (!order) return;

        const statusProgression: OrderData['status'][] = [
            'PENDING',
            'CONFIRMED',
            'PREPARING',
            'READY',
            'DELIVERING',
            'DELIVERED',
        ];

        const currentIndex = statusProgression.indexOf(order.status);

        if (currentIndex < statusProgression.length - 1) {
            const timeout = setTimeout(() => {
                const nextStatus = statusProgression[currentIndex + 1];
                updateOrderStatus(order.id, nextStatus);
                setOrder((prev) => prev ? { ...prev, status: nextStatus } : null);
            }, 5000); // Avança a cada 5 segundos

            return () => clearTimeout(timeout);
        }
    }, [order, updateOrderStatus]);

    if (!isHydrated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-[#00A082] border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
                <Link
                    href="/"
                    className="text-[#00A082] font-semibold hover:underline"
                >
                    Voltar para home
                </Link>
            </div>
        );
    }

    const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order.status);
    const estimatedTime = new Date(order.estimatedDelivery).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-8">
            {/* Header de Sucesso */}
            <div className="bg-[#00A082] text-white p-6 text-center">
                <CheckCircle size={64} className="mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Pedido Confirmado!</h1>
                <p className="text-white/80">Pedido #{order.id}</p>
            </div>

            <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {/* Tempo estimado */}
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
                    <Clock size={32} className="mx-auto mb-2 text-[#00A082]" />
                    <p className="text-gray-500">Previsão de entrega</p>
                    <p className="text-3xl font-bold">{estimatedTime}</p>
                </div>

                {/* Progress Steps */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h2 className="font-bold text-lg mb-6">Acompanhe seu pedido</h2>

                    <div className="space-y-4">
                        {STATUS_STEPS.map((step, index) => {
                            const StepIcon = step.icon;
                            const isCompleted = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;

                            return (
                                <div key={step.key} className="flex items-center gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                            isCompleted
                                                ? 'bg-[#00A082] text-white'
                                                : 'bg-gray-100 text-gray-400'
                                        }`}
                                    >
                                        <StepIcon size={20} />
                                    </div>

                                    <div className="flex-1">
                                        <p
                                            className={`font-medium ${
                                                isCompleted ? 'text-gray-900' : 'text-gray-400'
                                            }`}
                                        >
                                            {step.label}
                                        </p>
                                        {isCurrent && (
                                            <p className="text-sm text-[#00A082]">Em andamento...</p>
                                        )}
                                    </div>

                                    {isCompleted && index < currentStepIndex && (
                                        <CheckCircle size={20} className="text-[#00A082]" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Endereço de entrega */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin size={24} className="text-[#00A082]" />
                        <h2 className="font-bold text-lg">Endereço de entrega</h2>
                    </div>
                    <p className="text-gray-600">{formatAddress(order.address)}</p>
                </div>

                {/* Forma de pagamento */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <CreditCard size={24} className="text-[#00A082]" />
                        <h2 className="font-bold text-lg">Forma de pagamento</h2>
                    </div>
                    <p className="text-gray-600">
                        {order.paymentMethod === 'CREDIT_CARD' && '💳 Cartão de Crédito'}
                        {order.paymentMethod === 'DEBIT_CARD' && '💳 Cartão de Débito'}
                        {order.paymentMethod === 'PIX' && '📱 Pix'}
                        {order.paymentMethod === 'CASH' && '💵 Dinheiro'}
                        {order.paymentMethod === 'CASH' && order.changeFor && (
                            <span className="block text-sm text-gray-400 mt-1">
                Troco para R$ {order.changeFor.toFixed(2)}
              </span>
                        )}
                    </p>
                </div>

                {/* Itens do pedido */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h2 className="font-bold text-lg mb-4">Itens do pedido</h2>

                    <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={item.menuItem.image}
                                        alt={item.menuItem.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">
                                        {item.quantity}x {item.menuItem.name}
                                    </p>
                                    {item.observation && (
                                        <p className="text-xs text-gray-400">📝 {item.observation}</p>
                                    )}
                                </div>
                                <p className="font-medium">
                                    {formatPrice(item.menuItem.price * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Entrega</span>
                            <span>
                {order.deliveryFee === 0 ? 'Grátis' : formatPrice(order.deliveryFee)}
              </span>
                        </div>
                        {order.discount > 0 && (
                            <div className="flex justify-between text-sm text-[#00A082]">
                                <span>Desconto</span>
                                <span>-{formatPrice(order.discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                            <span>Total</span>
                            <span>{formatPrice(order.total)}</span>
                        </div>
                    </div>
                </div>

                {/* Botão voltar */}
                <Link
                    href="/"
                    className="block w-full bg-[#00A082] text-white py-4 rounded-full font-semibold hover:bg-[#008F74] transition-colors text-center"
                >
                    Fazer novo pedido
                </Link>
            </main>
        </div>
    );
}