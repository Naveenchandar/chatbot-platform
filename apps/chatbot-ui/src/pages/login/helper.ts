export const validateLoginForm = (username: string, password: string): string | null => {
    if (!username && !password) {
        return "Please enter your username and password";
    }
    if (!username) {
        return "Please enter your username";
    }
    if (!password) {
        return "Please enter your password";
    }
    return null;
}