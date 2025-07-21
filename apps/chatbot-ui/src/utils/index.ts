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
