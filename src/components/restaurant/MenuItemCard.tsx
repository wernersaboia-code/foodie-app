// src/components/restaurant/MenuItemCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils/format.utils';
import MenuItemModal from './MenuItemModal';

interface MenuItemCardProps {
    item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (): void => {
        setIsModalOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsModalOpen(false);
    };

    return (
        <>
            <article
                onClick={handleOpenModal}
                className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#00A082] hover:shadow-md transition-all group cursor-pointer"
            >
                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.popular && (
                            <span className="shrink-0 bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded-full font-medium">
                🔥 Popular
              </span>
                        )}
                    </div>

                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {item.description}
                    </p>

                    <p className="text-[#00A082] font-bold text-lg mt-3">
                        {formatPrice(item.price)}
                    </p>
                </div>

                {/* Imagem + Botão */}
                <div className="relative shrink-0">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal();
                        }}
                        className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#00A082] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#008F74] transition-colors"
                        aria-label={`Adicionar ${item.name} ao carrinho`}
                    >
                        <Plus size={24} />
                    </button>
                </div>
            </article>

            {/* Modal */}
            <MenuItemModal
                item={item}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}