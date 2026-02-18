// src/types/auth.types.ts
export interface AuthFormData {
    email: string;
    password: string;
}

export interface SignUpFormData extends AuthFormData {
    fullName: string;
    confirmPassword: string;
}

export interface AuthError {
    message: string;
    field?: string;
}

export type AuthMode = 'sign-in' | 'sign-up';