export const getUsername = () => {
    return localStorage.getItem('username') ?? '';
}

export const getUserId = () => {
    return localStorage.getItem('userid') ?? '';
}