// src/components/checkout/CheckoutHeader.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutHeader() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Voltar */}
                    <Link
                        href="/cart"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft size={24} />
                        <span className="hidden sm:inline font-medium">Voltar</span>
                    </Link>

                    {/* Título */}
                    <h1 className="text-xl font-bold">Checkout</h1>

                    {/* Espaçador */}
                    <div className="w-10" />
                </div>
            </div>
        </header>
    );
}