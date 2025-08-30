export const getUsername = () => {
    return localStorage.getItem('username') ?? '';
}

export const getUserId = () => {
    return localStorage.getItem('userid') ?? '';
}

export function groupBy<T, K extends keyof T>(array: readonly T[], property: K): Record<string, T[]> {
    return array.reduce<Record<string, T[]>>((acc, item) => {
        const key = String(item[property]);
        (acc[key] ??= []).push(item);
        return acc;
    }, {});
}

export function decodeJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Handle base64url to base64 conversion
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error decoding JWT:", e);
        return null;
    }
}
