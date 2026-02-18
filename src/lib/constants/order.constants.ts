// src/lib/constants/order.constants.ts
export const ORDER_MESSAGES = {
    PAGE_TITLE: 'Meus Pedidos',
    PAGE_SUBTITLE: 'Acompanhe seus pedidos atuais e anteriores',
    EMPTY_TITLE: 'Nenhum pedido ainda',
    EMPTY_SUBTITLE: 'Quando você fizer seu primeiro pedido, ele aparecerá aqui',
    EMPTY_BUTTON: 'Explorar restaurantes',
    LOAD_ERROR: 'Erro ao carregar pedidos',
    TAB_ACTIVE: 'Em andamento',
    TAB_COMPLETED: 'Concluídos',
    TRACK_ORDER: 'Acompanhar',
    REORDER: 'Pedir novamente',
    ITEMS_COUNT: (count: number) => `${count} ${count === 1 ? 'item' : 'itens'}`,
} as const

export const ORDER_STATUS_CONFIG: Record<string, {
    label: string
    color: string
    bgColor: string
    icon: string
}> = {
    PENDING: {
        label: 'Pendente',
        color: '#FFAA00',
        bgColor: 'rgba(255, 170, 0, 0.15)',
        icon: '⏳',
    },
    CONFIRMED: {
        label: 'Confirmado',
        color: '#00A082',
        bgColor: 'rgba(0, 160, 130, 0.15)',
        icon: '✅',
    },
    PREPARING: {
        label: 'Preparando',
        color: '#FF6B35',
        bgColor: 'rgba(255, 107, 53, 0.15)',
        icon: '👨‍🍳',
    },
    READY: {
        label: 'Pronto',
        color: '#00A082',
        bgColor: 'rgba(0, 160, 130, 0.15)',
        icon: '📦',
    },
    PICKED_UP: {
        label: 'Saiu para entrega',
        color: '#4A90D9',
        bgColor: 'rgba(74, 144, 217, 0.15)',
        icon: '🏍️',
    },
    DELIVERING: {
        label: 'A caminho',
        color: '#4A90D9',
        bgColor: 'rgba(74, 144, 217, 0.15)',
        icon: '🛵',
    },
    DELIVERED: {
        label: 'Entregue',
        color: '#00A082',
        bgColor: 'rgba(0, 160, 130, 0.15)',
        icon: '✅',
    },
    CANCELLED: {
        label: 'Cancelado',
        color: '#FF4444',
        bgColor: 'rgba(255, 68, 68, 0.15)',
        icon: '❌',
    },
}

export const ACTIVE_STATUSES = [
    'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'PICKED_UP', 'DELIVERING',
]

export const COMPLETED_STATUSES = ['DELIVERED', 'CANCELLED']