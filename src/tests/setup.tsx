// src/tests/setup.tsx
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import React from 'react';

// Limpa após cada teste
afterEach(() => {
    cleanup();
});

// Mock do localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

// Mock do window.confirm
vi.stubGlobal('confirm', vi.fn(() => true));

// Mock do next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
    }),
    useParams: () => ({}),
    usePathname: () => '/',
}));

// Mock do next/image
vi.mock('next/image', () => ({
    default: function MockImage({
                                    src,
                                    alt,
                                    fill,
                                    ...props
                                }: {
        src: string;
        alt: string;
        fill?: boolean;
        [key: string]: unknown
    }) {
        return React.createElement('img', {
            src,
            alt,
            'data-fill': fill ? 'true' : undefined,
            ...props
        });
    },
}));

// Mock do sonner (toast)
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn(),
    },
    Toaster: () => null,
}));