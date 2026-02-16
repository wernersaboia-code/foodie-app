// src/app/page.tsx
import Header from '@/components/layout/Header';
import PromoBanner from '@/components/home/PromoBanner';
import Categories from '@/components/home/Categories';
import RestaurantList from '@/components/home/RestaurantList';
import {
    restaurants,
    getPopularRestaurants,
    getFreeDeliveryRestaurants,
} from '@/data/mock';

export default function HomePage() {
    const popularRestaurants = getPopularRestaurants();
    const freeDeliveryRestaurants = getFreeDeliveryRestaurants();

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <PromoBanner />
            <Categories />

            <RestaurantList
                title="⭐ Populares perto de você"
                restaurants={popularRestaurants}
            />

            <RestaurantList
                title="🆓 Entrega Grátis"
                restaurants={freeDeliveryRestaurants}
            />

            <RestaurantList
                title="🏪 Todos os restaurantes"
                restaurants={restaurants}
                showViewAll={false}
            />
        </main>
    );
}