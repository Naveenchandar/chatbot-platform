type ChatMessage = {
    __typename: "ChatMessage";
    content: string;
    chat_id: string;
    created_at: string;
    updated_at: string;
    id: number;
    role: "user" | "assistant" | "system";
};
type GetChatHistoryResponse = {
    getChatHistory: ChatMessage[]
}