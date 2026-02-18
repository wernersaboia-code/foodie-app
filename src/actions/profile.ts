// src/actions/profile.ts
'use server'

import { createClient } from '@/lib/supabase/server'

export interface ProfileData {
    id: string
    fullName: string
    email: string
    phone: string
    avatarUrl: string
    authProvider: string
    createdAt: string
}

export async function getProfile(): Promise<{ data?: ProfileData; error?: string }> {
    const supabase = await createClient()

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'Usuário não autenticado' }
    }

    // Fetch profile from database
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (profileError) {
        return { error: 'Erro ao carregar perfil' }
    }

    // Determine auth provider
    const authProvider = user.app_metadata?.provider || 'email'

    return {
        data: {
            id: user.id,
            fullName: profile.full_name || '',
            email: user.email || '',
            phone: profile.phone || '',
            avatarUrl: profile.avatar_url || '',
            authProvider,
            createdAt: user.created_at,
        },
    }
}

export async function updateProfile(formData: {
    fullName: string
    phone: string
}): Promise<{ success?: boolean; error?: string }> {
    const supabase = await createClient()

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'Usuário não autenticado' }
    }

    // Update profile in database
    const { error: updateError } = await supabase
        .from('profiles')
        .update({
            full_name: formData.fullName,
            phone: formData.phone,
        })
        .eq('id', user.id)

    if (updateError) {
        return { error: 'Erro ao atualizar perfil' }
    }

    // Also update auth metadata (so Header shows updated name)
    await supabase.auth.updateUser({
        data: {
            full_name: formData.fullName,
        },
    })

    return { success: true }
}