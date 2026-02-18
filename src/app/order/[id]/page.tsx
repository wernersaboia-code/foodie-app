// src/app/order/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
    Home,
} from 'lucide-react';
import { motion } from 'framer-motion';
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

const PAYMENT_LABELS: Record<string, string> = {
    CREDIT_CARD: '💳 Cartão de Crédito',
    DEBIT_CARD: '💳 Cartão de Débito',
    PIX: '📱 Pix',
    CASH: '💵 Dinheiro',
};

export default function OrderPage() {
    const params = useParams();
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
                setOrder((prev) =>
                    prev ? { ...prev, status: nextStatus } : null
                );
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [order, updateOrderStatus]);

    // Loading state
    if (!isHydrated) {
        return (
            <div
                className="min-h-screen flex items-center justify-center transition-colors"
                style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
                <div className="animate-spin w-8 h-8 border-4 border-[#00A082] border-t-transparent rounded-full" />
            </div>
        );
    }

    // Order not found
    if (!order) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors"
                style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
                <div className="text-6xl mb-4">📦</div>
                <h1
                    className="text-2xl font-bold mb-4"
                    style={{ color: 'var(--color-text)' }}
                >
                    Pedido não encontrado
                </h1>
                <p
                    className="mb-6"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    O pedido que você procura não existe ou foi removido.
                </p>
                <Link
                    href="/"
                    className="bg-[#00A082] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#008F74] transition-colors"
                >
                    Voltar para home
                </Link>
            </div>
        );
    }

    const currentStepIndex = STATUS_STEPS.findIndex(
        (s) => s.key === order.status
    );
    const isDelivered = order.status === 'DELIVERED';
    const estimatedTime = new Date(order.estimatedDelivery).toLocaleTimeString(
        'pt-BR',
        { hour: '2-digit', minute: '2-digit' }
    );

    return (
        <div
            className="min-h-screen pb-8 transition-colors"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
            {/* Header de Sucesso */}
            <div className="bg-[#00A082] text-white p-6 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                    <CheckCircle size={64} className="mx-auto mb-4" />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold mb-2"
                >
                    {isDelivered ? 'Pedido Entregue! 🎉' : 'Pedido Confirmado!'}
                </motion.h1>
                <p className="text-white/80">Pedido #{order.id}</p>
            </div>

            <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {/* Tempo estimado */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl p-6 text-center border transition-colors"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    <Clock size={32} className="mx-auto mb-2 text-[#00A082]" />
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        {isDelivered
                            ? 'Entregue às'
                            : 'Previsão de entrega'}
                    </p>
                    <p
                        className="text-3xl font-bold"
                        style={{ color: 'var(--color-text)' }}
                    >
                        {estimatedTime}
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl p-6 border transition-colors"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    <h2
                        className="font-bold text-lg mb-6"
                        style={{ color: 'var(--color-text)' }}
                    >
                        Acompanhe seu pedido
                    </h2>

                    <div className="space-y-4">
                        {STATUS_STEPS.map((step, index) => {
                            const StepIcon = step.icon;
                            const isCompleted = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;

                            return (
                                <motion.div
                                    key={step.key}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                            isCompleted
                                                ? 'bg-[#00A082] text-white'
                                                : ''
                                        }`}
                                        style={{
                                            backgroundColor: isCompleted
                                                ? undefined
                                                : 'var(--color-bg-secondary)',
                                            color: isCompleted
                                                ? undefined
                                                : 'var(--color-text-tertiary)',
                                        }}
                                    >
                                        <StepIcon size={20} />
                                    </div>

                                    <div className="flex-1">
                                        <p
                                            className="font-medium"
                                            style={{
                                                color: isCompleted
                                                    ? 'var(--color-text)'
                                                    : 'var(--color-text-tertiary)',
                                            }}
                                        >
                                            {step.label}
                                        </p>
                                        {isCurrent && !isDelivered && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 2,
                                                }}
                                                className="text-sm text-[#00A082]"
                                            >
                                                Em andamento...
                                            </motion.p>
                                        )}
                                    </div>

                                    {isCompleted && index < currentStepIndex && (
                                        <CheckCircle
                                            size={20}
                                            className="text-[#00A082]"
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Endereço de entrega */}
                <div
                    className="rounded-2xl p-6 border transition-colors"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <MapPin size={24} className="text-[#00A082]" />
                        <h2
                            className="font-bold text-lg"
                            style={{ color: 'var(--color-text)' }}
                        >
                            Endereço de entrega
                        </h2>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        {formatAddress(order.address)}
                    </p>
                </div>

                {/* Forma de pagamento */}
                <div
                    className="rounded-2xl p-6 border transition-colors"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <CreditCard size={24} className="text-[#00A082]" />
                        <h2
                            className="font-bold text-lg"
                            style={{ color: 'var(--color-text)' }}
                        >
                            Forma de pagamento
                        </h2>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        {PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod}
                        {order.paymentMethod === 'CASH' && order.changeFor && (
                            <span
                                className="block text-sm mt-1"
                                style={{ color: 'var(--color-text-tertiary)' }}
                            >
                                Troco para R$ {order.changeFor.toFixed(2)}
                            </span>
                        )}
                    </p>
                </div>

                {/* Itens do pedido */}
                <div
                    className="rounded-2xl p-6 border transition-colors"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                    }}
                >
                    <h2
                        className="font-bold text-lg mb-4"
                        style={{ color: 'var(--color-text)' }}
                    >
                        Itens do pedido
                    </h2>

                    <div className="space-y-3 mb-4">
                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={item.menuItem.image}
                                        alt={item.menuItem.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p
                                        className="font-medium"
                                        style={{ color: 'var(--color-text)' }}
                                    >
                                        {item.quantity}x {item.menuItem.name}
                                    </p>
                                    {item.observation && (
                                        <p
                                            className="text-xs"
                                            style={{
                                                color: 'var(--color-text-tertiary)',
                                            }}
                                        >
                                            📝 {item.observation}
                                        </p>
                                    )}
                                </div>
                                <p
                                    className="font-medium"
                                    style={{ color: 'var(--color-text)' }}
                                >
                                    {formatPrice(
                                        item.menuItem.price * item.quantity
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div
                        className="border-t pt-4 space-y-2"
                        style={{ borderColor: 'var(--color-border)' }}
                    >
                        <div className="flex justify-between text-sm">
                            <span
                                style={{
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                Subtotal
                            </span>
                            <span
                                style={{
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                {formatPrice(order.subtotal)}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span
                                style={{
                                    color: 'var(--color-text-secondary)',
                                }}
                            >
                                Entrega
                            </span>
                            <span
                                style={{
                                    color:
                                        order.deliveryFee === 0
                                            ? 'var(--color-primary)'
                                            : 'var(--color-text-secondary)',
                                }}
                            >
                                {order.deliveryFee === 0
                                    ? 'Grátis'
                                    : formatPrice(order.deliveryFee)}
                            </span>
                        </div>
                        {order.discount > 0 && (
                            <div
                                className="flex justify-between text-sm"
                                style={{ color: 'var(--color-primary)' }}
                            >
                                <span>Desconto</span>
                                <span>-{formatPrice(order.discount)}</span>
                            </div>
                        )}
                        <div
                            className="flex justify-between font-bold text-lg pt-2 border-t"
                            style={{
                                color: 'var(--color-text)',
                                borderColor: 'var(--color-border)',
                            }}
                        >
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