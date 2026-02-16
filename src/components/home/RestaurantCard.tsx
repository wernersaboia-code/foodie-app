// src/components/home/RestaurantCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Restaurant } from '@/types';
import { formatPrice } from '@/lib/utils/format.utils';

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const {
        id,
        name,
        image,
        rating,
        deliveryTime,
        deliveryFee,
        category,
        promoted,
    } = restaurant;

    return (
        <Link href={`/restaurant/${id}`}>
            <article className="card overflow-hidden cursor-pointer group">
                {/* Imagem */}
                <div className="relative h-40 overflow-hidden">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {promoted && (
                        <span className="absolute top-3 left-3 bg-[#00A082] text-white text-xs px-2 py-1 rounded-full font-medium">
              Patrocinado
            </span>
                    )}
                    {deliveryFee === 0 && (
                        <span className="absolute top-3 right-3 bg-[#1A1A1A] text-white text-xs px-2 py-1 rounded-full font-medium">
              Entrega Grátis
            </span>
                    )}
                </div>

                {/* Info */}
                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{name}</h3>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-[#1A1A1A] font-medium">{rating}</span>
                        </div>
                        <span>•</span>
                        <span>{deliveryTime}</span>
                        <span>•</span>
                        <span>{formatPrice(deliveryFee)}</span>
                    </div>

                    <span className="inline-block mt-2 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
            {category}
          </span>
                </div>
            </article>
        </Link>
    );
}