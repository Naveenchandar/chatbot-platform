import type { StateCreator } from "zustand";
import type { LoginFormTypes } from "../types/auth";

export interface AuthSlice extends LoginFormTypes {
    usernameChange: (value: string) => void,
    passwordChange: (value: string) => void,
    updateError: (value: string | null) => void,
    updateAuthType: (value: 'login' | 'register') => void,
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
    authType: 'login',
    password: '',
    username: '',
    validationError: null,
    usernameChange: (value) =>
        set(() => ({
            username: value,
        })),

    passwordChange: (value) =>
        set(() => ({
            password: value,
        })),

    updateError: (value) =>
        set(() => ({
            validationError: value,
        })),

    updateAuthType: (value) =>
        set(() => ({
            authType: value,
        })),

}) 