import { redirect } from "react-router-dom";

export async function requireAuth() {
    const username = localStorage.getItem('username');
    if (!username) throw redirect('/');
}

export async function requireNoAuth() {
    const username = localStorage.getItem('username');
    if (username) throw redirect('/chat');
    return null;
}