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

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50">
                <div className="w-10 h-10 bg-[#00A082] rounded-full flex items-center justify-center">
                    <MapPin size={20} className="text-white" />
                </div>
                <h2 className="font-bold text-lg">{CHECKOUT_MESSAGES.addressTitle}</h2>
            </div>

            {/* Formulário */}
            <div className="p-4 space-y-4">
                {/* Rua e Número */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rua *
                        </label>
                        <input
                            type="text"
                            value={data.street}
                            onChange={(e) => onChange('street', e.target.value)}
                            placeholder="Nome da rua"
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082] ${
                                errors.street ? 'border-red-500' : 'border-gray-200'
                            }`}
                        />
                        {errors.street && (
                            <p className="text-red-500 text-sm mt-1">{errors.street}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número *
                        </label>
                        <input
                            type="text"
                            value={data.number}
                            onChange={(e) => onChange('number', e.target.value)}
                            placeholder="123"
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082] ${
                                errors.number ? 'border-red-500' : 'border-gray-200'
                            }`}
                        />
                        {errors.number && (
                            <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                        )}
                    </div>
                </div>

                {/* Complemento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Complemento
                        <span className="text-gray-400 font-normal ml-1">(opcional)</span>
                    </label>
                    <input
                        type="text"
                        value={data.complement || ''}
                        onChange={(e) => onChange('complement', e.target.value)}
                        placeholder="Apto, bloco, referência..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082]"
                    />
                </div>

                {/* Bairro */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bairro *
                    </label>
                    <input
                        type="text"
                        value={data.neighborhood}
                        onChange={(e) => onChange('neighborhood', e.target.value)}
                        placeholder="Nome do bairro"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082] ${
                            errors.neighborhood ? 'border-red-500' : 'border-gray-200'
                        }`}
                    />
                    {errors.neighborhood && (
                        <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>
                    )}
                </div>

                {/* Cidade, Estado e CEP */}
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Cidade *
                        </label>
                        <input
                            type="text"
                            value={data.city}
                            onChange={(e) => onChange('city', e.target.value)}
                            placeholder="Sua cidade"
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082] ${
                                errors.city ? 'border-red-500' : 'border-gray-200'
                            }`}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            UF *
                        </label>
                        <select
                            value={data.state}
                            onChange={(e) => onChange('state', e.target.value)}
                            className={`w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082] bg-white ${
                                errors.state ? 'border-red-500' : 'border-gray-200'
                            }`}
                        >
                            <option value="">-</option>
                            {BRAZILIAN_STATES.map((state) => (
                                <option key={state.value} value={state.value}>
                                    {state.value}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            CEP *
                        </label>
                        <input
                            type="text"
                            value={data.zipCode}
                            onChange={(e) => handleZipCodeChange(e.target.value)}
                            placeholder="00000-000"
                            maxLength={9}
                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A082] ${
                                errors.zipCode ? 'border-red-500' : 'border-gray-200'
                            }`}
                        />
                        {errors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}