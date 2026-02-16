// src/lib/constants/checkout.constants.ts
import { PaymentMethod } from '@/types';

export interface PaymentOption {
    value: PaymentMethod;
    label: string;
    icon: string;
    description?: string;
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
    {
        value: 'CREDIT_CARD',
        label: 'Cartão de Crédito',
        icon: '💳',
        description: 'Visa, Mastercard, Elo...',
    },
    {
        value: 'DEBIT_CARD',
        label: 'Cartão de Débito',
        icon: '💳',
        description: 'Débito na entrega',
    },
    {
        value: 'PIX',
        label: 'Pix',
        icon: '📱',
        description: 'Pagamento instantâneo',
    },
    {
        value: 'CASH',
        label: 'Dinheiro',
        icon: '💵',
        description: 'Pague na entrega',
    },
];

export const CHECKOUT_MESSAGES = {
    addressTitle: 'Endereço de Entrega',
    paymentTitle: 'Forma de Pagamento',
    summaryTitle: 'Resumo do Pedido',
    confirmButton: 'Confirmar Pedido',
    changeFor: 'Troco para quanto?',
    changeForPlaceholder: 'Ex: 100',
    noChangeNeeded: 'Não preciso de troco',
    processing: 'Processando...',
    success: 'Pedido realizado com sucesso!',
} as const;

export const BRAZILIAN_STATES = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
];