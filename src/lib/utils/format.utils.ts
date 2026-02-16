// src/lib/utils/format.utils.ts
import { CURRENCY } from '@/lib/constants/app.constants';

/**
 * Formata valor para moeda brasileira
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat(CURRENCY.locale, {
        style: 'currency',
        currency: CURRENCY.code,
    }).format(value);
}

/**
 * Formata valor de forma curta (R$ 5,99)
 */
export function formatPrice(value: number): string {
    if (value === 0) return 'Grátis';
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

/**
 * Formata tempo de entrega
 */
export function formatDeliveryTime(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}min`
        : `${hours}h`;
}

/**
 * Formata avaliação com uma casa decimal
 */
export function formatRating(rating: number): string {
    return rating.toFixed(1);
}