// src/components/checkout/AddressForm.tsx
'use client';

import { MapPin } from 'lucide-react';
import { AddressFormData } from '@/lib/validations/checkout.validations';
import { BRAZILIAN_STATES, CHECKOUT_MESSAGES } from '@/lib/constants/checkout.constants';
import { formatZipCode } from '@/lib/utils/checkout.utils';

interface AddressFormProps {
    data: AddressFormData;
    errors: Partial<Record<keyof AddressFormData, string>>;
    onChange: (field: keyof AddressFormData, value: string) => void;
}

export default function AddressForm({ data, errors, onChange }: AddressFormProps) {
    const handleZipCodeChange = (value: string): void => {
        onChange('zipCode', formatZipCode(value));
    };

    const inputBaseStyles = "w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082] transition-colors";

    const getInputStyle = (hasError: boolean) => ({
        backgroundColor: 'var(--color-bg-input)',
        color: 'var(--color-text)',
        borderColor: hasError ? 'var(--color-error)' : 'var(--color-border)',
    });

    return (
        <div
            className="rounded-2xl border overflow-hidden transition-colors"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border)',
            }}
        >
            {/* Header */}
            <div
                className="flex items-center gap-3 p-4 border-b transition-colors"
                style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderColor: 'var(--color-border)',
                }}
            >
                <div className="w-10 h-10 bg-[#00A082] rounded-full flex items-center justify-center">
                    <MapPin size={20} className="text-white" />
                </div>
                <h2
                    className="font-bold text-lg"
                    style={{ color: 'var(--color-text)' }}
                >
                    {CHECKOUT_MESSAGES.addressTitle}
                </h2>
            </div>

            {/* Formulário */}
            <div className="p-4 space-y-4">
                {/* Rua e Número */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            Rua *
                        </label>
                        <input
                            type="text"
                            value={data.street}
                            onChange={(e) => onChange('street', e.target.value)}
                            placeholder="Nome da rua"
                            className={inputBaseStyles}
                            style={getInputStyle(!!errors.street)}
                        />
                        {errors.street && (
                            <p className="text-sm mt-1" style={{ color: 'var(--color-error)' }}>
                                {errors.street}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            Número *
                        </label>
                        <input
                            type="text"
                            value={data.number}
                            onChange={(e) => onChange('number', e.target.value)}
                            placeholder="123"
                            className={inputBaseStyles}
                            style={getInputStyle(!!errors.number)}
                        />
                        {errors.number && (
                            <p className="text-sm mt-1" style={{ color: 'var(--color-error)' }}>
                                {errors.number}
                            </p>
                        )}
                    </div>
                </div>

                {/* Complemento */}
                <div>
                    <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Complemento
                        <span
                            className="font-normal ml-1"
                            style={{ color: 'var(--color-text-tertiary)' }}
                        >
                            (opcional)
                        </span>
                    </label>
                    <input
                        type="text"
                        value={data.complement || ''}
                        onChange={(e) => onChange('complement', e.target.value)}
                        placeholder="Apto, bloco, referência..."
                        className={inputBaseStyles}
                        style={getInputStyle(false)}
                    />
                </div>

                {/* Bairro */}
                <div>
                    <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Bairro *
                    </label>
                    <input
                        type="text"
                        value={data.neighborhood}
                        onChange={(e) => onChange('neighborhood', e.target.value)}
                        placeholder="Nome do bairro"
                        className={inputBaseStyles}
                        style={getInputStyle(!!errors.neighborhood)}
                    />
                    {errors.neighborhood && (
                        <p className="text-sm mt-1" style={{ color: 'var(--color-error)' }}>
                            {errors.neighborhood}
                        </p>
                    )}
                </div>

                {/* Cidade, Estado e CEP */}
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-3">
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            Cidade *
                        </label>
                        <input
                            type="text"
                            value={data.city}
                            onChange={(e) => onChange('city', e.target.value)}
                            placeholder="Sua cidade"
                            className={inputBaseStyles}
                            style={getInputStyle(!!errors.city)}
                        />
                        {errors.city && (
                            <p className="text-sm mt-1" style={{ color: 'var(--color-error)' }}>
                                {errors.city}
                            </p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            UF *
                        </label>
                        <select
                            value={data.state}
                            onChange={(e) => onChange('state', e.target.value)}
                            className="w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082] transition-colors"
                            style={getInputStyle(!!errors.state)}
                        >
                            <option value="">-</option>
                            {BRAZILIAN_STATES.map((state) => (
                                <option key={state.value} value={state.value}>
                                    {state.value}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <p className="text-sm mt-1" style={{ color: 'var(--color-error)' }}>
                                {errors.state}
                            </p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            CEP *
                        </label>
                        <input
                            type="text"
                            value={data.zipCode}
                            onChange={(e) => handleZipCodeChange(e.target.value)}
                            placeholder="00000-000"
                            maxLength={9}
                            className={inputBaseStyles}
                            style={getInputStyle(!!errors.zipCode)}
                        />
                        {errors.zipCode && (
                            <p className="text-sm mt-1" style={{ color: 'var(--color-error)' }}>
                                {errors.zipCode}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}