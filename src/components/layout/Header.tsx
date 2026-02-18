// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, User, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
    const [address] = useState('Rua das Flores, 123');
    const { totalItems, setIsCartOpen } = useCart();

    const handleCartClick = (): void => {
        setIsCartOpen(true);
    };

    return (
        <header
            className="sticky top-0 z-50 border-b transition-colors"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#00A082]">🍽️ Foodie</span>
                    </Link>

                    {/* Endereço - Desktop */}
                    <button
                        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:opacity-80"
                        style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                    >
                        <MapPin size={20} className="text-[#00A082]" />
                        <div className="text-left">
                            <p style={{ color: 'var(--color-text-secondary)' }} className="text-xs">
                                Entregar em
                            </p>
                            <p style={{ color: 'var(--color-text)' }} className="text-sm font-medium truncate max-w-[200px]">
                                {address}
                            </p>
                        </div>
                    </button>

                    {/* Busca - Desktop */}
                    <div className="flex-1 max-w-xl hidden md:block">
                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2"
                                size={20}
                                style={{ color: 'var(--color-text-secondary)' }}
                            />
                            <input
                                type="text"
                                placeholder="Buscar restaurantes ou pratos"
                                className="w-full rounded-full px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-[#00A082] transition-colors"
                                style={{
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    color: 'var(--color-text)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        <button
                            onClick={handleCartClick}
                            className="relative p-3 rounded-full transition-colors hover:opacity-80"
                            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                            aria-label="Abrir carrinho"
                        >
                            <ShoppingBag size={24} style={{ color: 'var(--color-text)' }} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#00A082] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
                            )}
                        </button>
                        <button
                            className="p-3 rounded-full transition-colors hover:opacity-80"
                            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                            aria-label="Menu do usuário"
                        >
                            <User size={24} style={{ color: 'var(--color-text)' }} />
                        </button>
                    </div>
                </div>

                {/* Busca - Mobile */}
                <div className="mt-4 md:hidden">
                    <div className="relative">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2"
                            size={20}
                            style={{ color: 'var(--color-text-secondary)' }}
                        />
                        <input
                            type="text"
                            placeholder="Buscar restaurantes ou pratos"
                            className="w-full rounded-full px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-[#00A082] transition-colors"
                            style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                color: 'var(--color-text)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}