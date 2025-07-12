type ChatMessage = {
    __typename: "ChatMessage";
    content: string;
    id: number;
    role: "user" | "assistant" | "system";
};
type GetChatHistoryResponse = {
    getChatHistory: ChatMessage[]
}