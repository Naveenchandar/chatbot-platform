import { useParams } from "react-router-dom";
import { useChat } from "../hooks";
import { groupBy } from "../../../../utils";
import Markdown from "react-markdown";

export const ActiveChat = () => {
    const { id } = useParams();
    const { data } = useChat();
    const messages = data?.getChatHistory;
    if (!id || !messages?.length) return null;
    // Filter by current chat ID
    const grouped = groupBy(messages, "chat_id");
    const chatMessages = grouped[id];

    if (!chatMessages?.length) return null;

    // Sort ascending (oldest to newest)
    chatMessages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    return (
        <div className="flex flex-col gap-3 max-w-5xl mx-auto p-4">
            {chatMessages.map((msg) => (
                <div
                    key={msg.id}
                    className={`p-3 rounded-md max-w-[70%] ${msg.role === "user"
                            ? "ml-auto bg-black text-white text-right"
                            : "mr-auto bg-[#e9e9e9b3] text-left"
                        }`}
                >
                    {msg.role === "assistant" ? (
                        <Markdown>{msg.content}</Markdown>
                    ) : (
                        msg.content
                    )}
                </div>
            ))}
        </div>
    );
};