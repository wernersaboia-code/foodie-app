// src/components/home/SearchBar.tsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBar({
                                      value,
                                      onChange,
                                      placeholder = 'Buscar restaurantes ou pratos'
                                  }: SearchBarProps) {
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const handleChange = useCallback((newValue: string): void => {
        setLocalValue(newValue);

        // Limpar timeout anterior
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Debounce de 300ms
        debounceRef.current = setTimeout(() => {
            onChange(newValue);
        }, 300);
    }, [onChange]);

    const handleClear = (): void => {
        setLocalValue('');
        onChange('');
        inputRef.current?.focus();
    };

    return (
        <div className="relative">
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
            />
            <input
                ref={inputRef}
                type="text"
                value={localValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-gray-100 rounded-full px-4 py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-[#00A082] transition-shadow"
            />
            {localValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Limpar busca"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}