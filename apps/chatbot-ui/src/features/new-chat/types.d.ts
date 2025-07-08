export type Message = {
    id: string;       // unique ID (e.g. uuid)
    role: 'user' | 'system'; // who sent it
    content: string;  // text
};