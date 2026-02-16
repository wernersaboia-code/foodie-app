// src/components/cart/CartRestaurantInfo.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, ChevronRight } from 'lucide-react';
import { Restaurant } from '@/types';

interface CartRestaurantInfoProps {
    restaurant: Restaurant;
}

export default function CartRestaurantInfo({ restaurant }: CartRestaurantInfoProps) {
    return (
        <Link
            href={`/restaurant/${restaurant.id}`}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#00A082] transition-colors"
        >
            {/* Imagem */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-lg truncate">{restaurant.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock size={16} />
                    <span>{restaurant.deliveryTime}</span>
                </div>
            </div>

            {/* Seta */}
            <ChevronRight size={24} className="text-gray-400" />
        </Link>
    );
}