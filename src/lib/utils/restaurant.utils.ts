// src/lib/utils/restaurant.utils.ts
import { Restaurant, MenuItem, MenuCategory } from '@/types';

/**
 * Agrupa itens do menu por categoria
 */
export function groupMenuByCategory(items: MenuItem[]): MenuCategory[] {
    const grouped = items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, MenuItem[]>);

    return Object.entries(grouped).map(([name, items]) => ({
        name,
        items,
    }));
}

/**
 * Filtra itens populares
 */
export function getPopularItems(items: MenuItem[]): MenuItem[] {
    return items.filter((item) => item.popular);
}

/**
 * Verifica se o restaurante está aberto
 */
export function isRestaurantOpen(restaurant: Restaurant): boolean {
    // TODO: Implementar lógica real com horários
    return restaurant.isOpen ?? true;
}

/**
 * Gera slug para URL do restaurante
 */
export function generateRestaurantSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}