export type Message = {
    id: string | number;       // unique ID (e.g. uuid)
    role: "user" | "assistant" | "system"; // who sent it
    content: string;  // text
};