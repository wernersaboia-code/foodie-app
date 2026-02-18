// src/lib/validations/auth.validations.ts
import { z } from 'zod';

export const signInSchema = z.object({
    email: z
        .email({ message: 'Digite um email válido' }),
    password: z
        .string()
        .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

export const signUpSchema = z
    .object({
        fullName: z
            .string()
            .min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
        email: z
            .email({ message: 'Digite um email válido' }),
        password: z
            .string()
            .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
        confirmPassword: z
            .string()
            .min(6, { message: 'Confirme sua senha' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
    });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;