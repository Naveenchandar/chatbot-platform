export const useGetUsername = () => {
    const username = localStorage.getItem('username');
    if (!username) {
        return 'Guest';
    }
    return username;
}