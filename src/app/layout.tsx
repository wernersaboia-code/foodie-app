// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Foodie - Delivery de Comida',
    description: 'Peça comida dos melhores restaurantes da sua região',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
        <body className={inter.className}>
        <CartProvider>
            {children}
            <Toaster
                position="top-center"
                richColors
                toastOptions={{
                    style: {
                        background: '#fff',
                        border: '1px solid #E8E8E8',
                    },
                }}
            />
        </CartProvider>
        </body>
        </html>
    );
}