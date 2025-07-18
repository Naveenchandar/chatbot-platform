interface Auth {
    authType?: 'login' | 'register'
}

export interface LoginFormTypes extends Auth {
    username: string,
    password: string,
    validationError: string | null
}
