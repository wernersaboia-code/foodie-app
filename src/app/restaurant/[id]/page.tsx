// src/app/restaurant/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Bike, ArrowLeft } from 'lucide-react';
import { getRestaurantById, getMenuCategoriesByRestaurant } from '@/data/mock';
import { formatPrice } from '@/lib/utils/format.utils';
import MenuItemCard from '@/components/restaurant/MenuItemCard';
import CartSidebar from '@/components/cart/CartSidebar';

interface RestaurantPageProps {
    params: Promise<{ id: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
    const { id } = await params;
    const restaurant = getRestaurantById(id);

    if (!restaurant) {
        notFound();
    }

    const menuCategories = getMenuCategoriesByRestaurant(id);

    return (
        <div
            className="min-h-screen transition-colors"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
        >
            {/* Header com imagem */}
            <div className="relative h-64 md:h-80">
                <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Botão voltar */}
                <Link
                    href="/"
                    className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors hover:opacity-80"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        color: 'var(--color-text)',
                    }}
                    aria-label="Voltar para home"
                >
                    <ArrowLeft size={20} />
                </Link>

                {/* Info do restaurante */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        {restaurant.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <Star size={18} className="text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold">{restaurant.rating}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Clock size={18} />
                            <span>{restaurant.deliveryTime}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Bike size={18} />
                            <span>{formatPrice(restaurant.deliveryFee)}</span>
                        </div>

                        <span className="bg-white/20 px-3 py-1 rounded-full">
              {restaurant.category}
            </span>
                    </div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-8">
                    {/* Menu */}
                    <div className="flex-1">
                        {/* Navegação por categoria */}
                        <nav
                            className="sticky top-0 py-4 mb-6 border-b z-10 transition-colors"
                            style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                borderColor: 'var(--color-border)'
                            }}
                        >
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {menuCategories.map((category) => (
                                    <a
                                        key={category.name}
                                        href={`#${category.name.replace(/\s+/g, '-')}`}
                                        className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border"
                                        style={{
                                            backgroundColor: 'var(--color-bg-card)',
                                            borderColor: 'var(--color-border)',
                                            color: 'var(--color-text)'
                                        }}
                                    >
                                        {category.name}
                                    </a>
                                ))}
                            </div>
                        </nav>

                        {/* Lista de itens por categoria */}
                        {menuCategories.map((category) => (
                            <section
                                key={category.name}
                                id={category.name.replace(/\s+/g, '-')}
                                className="mb-8"
                            >
                                <h2
                                    className="text-xl font-bold mb-4"
                                    style={{ color: 'var(--color-text)' }}
                                >
                                    {category.name}
                                </h2>
                                <div className="grid gap-4">
                                    {category.items.map((item) => (
                                        <MenuItemCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Sidebar do Carrinho - Desktop */}
                    <aside className="hidden lg:block w-96">
                        <div className="sticky top-4">
                            <CartSidebar />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}