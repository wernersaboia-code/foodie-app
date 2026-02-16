// src/lib/utils/checkout.utils.ts
import { OrderData, CartItem, Address, PaymentMethod } from '@/types';

/**
 * Gera um ID único para o pedido
 */
export function generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`.toUpperCase();
}

/**
 * Calcula tempo estimado de entrega
 */
export function calculateEstimatedDelivery(deliveryTime: string): string {
    // deliveryTime é algo como "25-35 min"
    const match = deliveryTime.match(/(\d+)-(\d+)/);

    if (!match) {
        return new Date(Date.now() + 45 * 60 * 1000).toISOString();
    }

    const maxMinutes = parseInt(match[2], 10);
    const estimatedTime = new Date(Date.now() + maxMinutes * 60 * 1000);

    return estimatedTime.toISOString();
}

/**
 * Formata o endereço para exibição
 */
export function formatAddress(address: Address): string {
    const parts = [
        `${address.street}, ${address.number}`,
        address.complement,
        address.neighborhood,
        `${address.city} - ${address.state}`,
        address.zipCode,
    ].filter(Boolean);

    return parts.join(', ');
}

/**
 * Formata CEP enquanto digita
 */
export function formatZipCode(value: string): string {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 5) {
        return numbers;
    }

    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
}

/**
 * Cria objeto do pedido
 */
export function createOrder(
    items: CartItem[],
    address: Address,
    paymentMethod: PaymentMethod,
    subtotal: number,
    deliveryFee: number,
    discount: number,
    restaurantId: string,
    restaurantName: string,
    deliveryTime: string,
    changeFor?: number
): OrderData {
    return {
        id: generateOrderId(),
        items,
        address,
        paymentMethod,
        changeFor,
        subtotal,
        deliveryFee,
        discount,
        total: subtotal + deliveryFee - discount,
        restaurantId,
        restaurantName,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        estimatedDelivery: calculateEstimatedDelivery(deliveryTime),
    };
}