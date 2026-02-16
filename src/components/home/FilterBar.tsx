// src/components/home/FilterBar.tsx
'use client';

import { SlidersHorizontal, X, Star, Bike, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActiveFilters } from '@/lib/constants/filter.constants';
import { CATEGORIES } from '@/lib/constants/restaurant.constants';

interface FilterBarProps {
    filters: ActiveFilters;
    onFilterChange: <K extends keyof ActiveFilters>(key: K, value: ActiveFilters[K]) => void;
    onReset: () => void;
    hasActiveFilters: boolean;
}

export default function FilterBar({
                                      filters,
                                      onFilterChange,
                                      onReset,
                                      hasActiveFilters,
                                  }: FilterBarProps) {
    return (
        <div className="space-y-4">
            {/* Filtros rápidos */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {/* Ordenação */}
                <select
                    value={filters.sortBy}
                    onChange={(e) => onFilterChange('sortBy', e.target.value)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00A082] cursor-pointer"
                >
                    <option value="relevance">Relevância</option>
                    <option value="rating">Melhor avaliação</option>
                    <option value="delivery_time">Mais rápido</option>
                    <option value="delivery_fee">Menor taxa</option>
                </select>

                {/* Entrega Grátis */}
                <button
                    onClick={() => onFilterChange('freeDeliveryOnly', !filters.freeDeliveryOnly)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        filters.freeDeliveryOnly
                            ? 'bg-[#00A082] text-white'
                            : 'bg-white border border-gray-200 hover:border-[#00A082]'
                    }`}
                >
                    <Bike size={16} />
                    Entrega Grátis
                </button>

                {/* Rating 4.5+ */}
                <button
                    onClick={() => onFilterChange('minRating', filters.minRating === 4.5 ? null : 4.5)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        filters.minRating === 4.5
                            ? 'bg-[#00A082] text-white'
                            : 'bg-white border border-gray-200 hover:border-[#00A082]'
                    }`}
                >
                    <Star size={16} />
                    4.5+
                </button>

                {/* Limpar filtros */}
                <AnimatePresence>
                    {hasActiveFilters && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={onReset}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium whitespace-nowrap hover:bg-red-100 transition-colors"
                        >
                            <X size={16} />
                            Limpar
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Categorias */}
            <div className="flex gap-3 overflow-x-auto pb-2">
                <button
                    onClick={() => onFilterChange('category', null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        filters.category === null
                            ? 'bg-[#00A082] text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                    Todos
                </button>
                {CATEGORIES.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onFilterChange('category',
                            filters.category === category.name ? null : category.name
                        )}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            filters.category === category.name
                                ? 'bg-[#00A082] text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                    >
                        <span>{category.icon}</span>
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
}