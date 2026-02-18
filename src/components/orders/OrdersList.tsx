// src/components/orders/OrdersList.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, ShoppingBag, ClipboardList } from 'lucide-react'
import { toast } from 'sonner'
import { getOrders, type OrderData } from '@/actions/orders'
import {
    ORDER_MESSAGES,
    ACTIVE_STATUSES,
    COMPLETED_STATUSES,
} from '@/lib/constants/order.constants'
import { OrderCard } from '@/components/orders/OrderCard'

type TabType = 'active' | 'completed'

export function OrdersList() {
    const router = useRouter()
    const [orders, setOrders] = useState<OrderData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [activeTab, setActiveTab] = useState<TabType>('active')

    useEffect(() => {
        const loadOrders = async (): Promise<void> => {
            const result = await getOrders()

            if (result.error) {
                toast.error(ORDER_MESSAGES.LOAD_ERROR)
                router.push('/sign-in')
                return
            }

            setOrders(result.data || [])
            setIsLoading(false)

            // Auto-select tab based on orders
            const hasActive = (result.data || []).some((o) =>
                ACTIVE_STATUSES.includes(o.status)
            )
            if (!hasActive && (result.data || []).length > 0) {
                setActiveTab('completed')
            }
        }

        loadOrders()
    }, [router])

    const activeOrders = orders.filter((o) => ACTIVE_STATUSES.includes(o.status))
    const completedOrders = orders.filter((o) => COMPLETED_STATUSES.includes(o.status))
    const displayedOrders = activeTab === 'active' ? activeOrders : completedOrders

    const handleExplore = (): void => {
        router.push('/')
    }

    // Loading
    if (isLoading) {
        return (
            <div
                className="flex min-h-[60vh] items-center justify-center"
                style={{ backgroundColor: 'var(--color-bg)' }}
            >
                <Loader2
                    size={32}
                    className="animate-spin"
                    style={{ color: '#00A082' }}
                />
            </div>
        )
    }

    return (
        <div
            className="min-h-screen transition-colors"
            style={{ backgroundColor: 'var(--color-bg)' }}
        >
            <div className="mx-auto max-w-2xl px-4 py-8">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <h1
                        className="text-2xl font-bold"
                        style={{ color: 'var(--color-text)' }}
                    >
                        {ORDER_MESSAGES.PAGE_TITLE}
                    </h1>
                    <p
                        className="mt-1 text-sm"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {ORDER_MESSAGES.PAGE_SUBTITLE}
                    </p>
                </motion.div>

                {orders.length > 0 ? (
                    <>
                        {/* Tabs */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="mb-6 flex gap-2 rounded-xl p-1"
                            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                        >
                            <button
                                onClick={() => setActiveTab('active')}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors"
                                style={{
                                    backgroundColor:
                                        activeTab === 'active'
                                            ? 'var(--color-bg-card)'
                                            : 'transparent',
                                    color:
                                        activeTab === 'active'
                                            ? '#00A082'
                                            : 'var(--color-text-secondary)',
                                    boxShadow:
                                        activeTab === 'active'
                                            ? 'var(--shadow-sm)'
                                            : 'none',
                                }}
                            >
                                <ClipboardList size={16} />
                                {ORDER_MESSAGES.TAB_ACTIVE}
                                {activeOrders.length > 0 && (
                                    <span
                                        className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#00A082] px-1.5 text-[10px] font-bold text-white"
                                    >
                                        {activeOrders.length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setActiveTab('completed')}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors"
                                style={{
                                    backgroundColor:
                                        activeTab === 'completed'
                                            ? 'var(--color-bg-card)'
                                            : 'transparent',
                                    color:
                                        activeTab === 'completed'
                                            ? '#00A082'
                                            : 'var(--color-text-secondary)',
                                    boxShadow:
                                        activeTab === 'completed'
                                            ? 'var(--shadow-sm)'
                                            : 'none',
                                }}
                            >
                                <ShoppingBag size={16} />
                                {ORDER_MESSAGES.TAB_COMPLETED}
                                {completedOrders.length > 0 && (
                                    <span
                                        className="text-xs"
                                        style={{ color: 'var(--color-text-tertiary)' }}
                                    >
                                        ({completedOrders.length})
                                    </span>
                                )}
                            </button>
                        </motion.div>

                        {/* Orders List */}
                        {displayedOrders.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {displayedOrders.map((order, index) => (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                        index={index}
                                    />
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-16 text-center"
                            >
                                <p
                                    className="text-sm"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    {activeTab === 'active'
                                        ? 'Nenhum pedido em andamento'
                                        : 'Nenhum pedido concluído'}
                                </p>
                            </motion.div>
                        )}
                    </>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center py-20"
                    >
                        <div
                            className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                        >
                            <ShoppingBag
                                size={36}
                                style={{ color: 'var(--color-text-tertiary)' }}
                            />
                        </div>
                        <h3
                            className="mb-2 text-lg font-semibold"
                            style={{ color: 'var(--color-text)' }}
                        >
                            {ORDER_MESSAGES.EMPTY_TITLE}
                        </h3>
                        <p
                            className="mb-6 text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            {ORDER_MESSAGES.EMPTY_SUBTITLE}
                        </p>
                        <button
                            onClick={handleExplore}
                            className="flex items-center gap-2 rounded-xl bg-[#00A082] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008F74]"
                        >
                            {ORDER_MESSAGES.EMPTY_BUTTON}
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}