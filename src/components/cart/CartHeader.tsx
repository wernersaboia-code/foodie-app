// src/components/cart/CartHeader.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function CartHeader() {
    const { items, clearCart } = useCart();

    const handleClearCart = (): void => {
        if (items.length === 0) return;

        const confirmed = window.confirm('Tem certeza que deseja limpar o carrinho?');
        if (confirmed) {
            clearCart();
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Voltar */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={24} />
                        <span className="hidden sm:inline font-medium">Voltar</span>
                    </Link>

                    {/* Título */}
                    <h1 className="text-xl font-bold">Seu Carrinho</h1>

                    {/* Limpar */}
                    <button
                        onClick={handleClearCart}
                        disabled={items.length === 0}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Limpar carrinho"
                    >
                        <Trash2 size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
}