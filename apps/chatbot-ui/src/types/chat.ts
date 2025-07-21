export type StreamMessage = {
    id: string,
    content: string,
    role: 'user' | 'system'
}