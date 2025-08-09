import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../../../../components/ui/textarea"
import { useState } from "react";
import { getUserId, getUsername } from "../../../../utils";
import { STREAMCHATURL } from "../../../../services/url";
import { useBoundStore } from "../../../../store";
import { CHAT_UPDATE } from "../../../../mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CHAT_HISTORY } from "../../../../query";
import type { StreamMessage } from "../../../../types/chat";
import Markdown from "react-markdown";
import { Skeleton } from "../../../../components/ui/skeleton";

export const PromptArea = () => {

    const [chatCurrentTextValue, setChatCurrentTextValue] = useState("");
    const [userChat, setUserChat] = useState("");
    const [newChatStreamMessages, setNewChatStreamMessages] = useState<StreamMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const { id: chatId } = params;

    const { id } = useParams();

    const updateMessages = useBoundStore(state => state.updateMessages);
    const navigate = useNavigate();
    const [chatUpdateMutation] = useMutation(CHAT_UPDATE);
    const userId = getUserId();
    const { refetch } = useQuery(GET_CHAT_HISTORY, {
        variables: {
            userId: Number(userId)
        }
    })

    const username = getUsername();

    const streamChat = async (message: string) => {
        if (!message.trim()) return;
        try {
            const userMessageId = crypto.randomUUID();
            updateMessages({ id: userMessageId, role: 'user', content: message });
            setIsLoading(true);
            const response = await fetch(STREAMCHATURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    message: message,
                }),
            });

            const reader = response.body?.getReader();
            const decoder = new TextDecoder("utf-8");

            if (!reader) {
                console.error("Failed to get reader from response body");
                return;
            }

            setChatCurrentTextValue(""); // Clear input immediately
            let buffer = "";

            setIsLoading(false);
            const systemMessageId = crypto.randomUUID();
            updateMessages({ id: systemMessageId, role: 'system', content: "" });

            setNewChatStreamMessages((prev) => [
                ...prev,
                { id: systemMessageId, role: 'system', content: "" }
            ]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                let lines = buffer.split("\n");

                // Keep last partial line in buffer
                buffer = lines.pop() || "";

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed.startsWith("data:")) {
                        const jsonPart = trimmed.replace(/^data:\s*/, "");
                        if (jsonPart === 'DONE') break;
                        try {
                            const parsed = JSON.parse(jsonPart);
                            useBoundStore.setState((state) => ({
                                messages: state.messages.map((msg) =>
                                    msg.id === systemMessageId
                                        ? { ...msg, content: msg.content + parsed.token }
                                        : msg
                                ),
                            }));
                            setNewChatStreamMessages((prev) =>
                                prev.map((msg) =>
                                    msg.id === systemMessageId
                                        ? { ...msg, content: msg.content + parsed.token }
                                        : msg
                                )
                            );
                        } catch (err) {
                            console.error("Error parsing JSON chunk:", err);
                        }
                    }
                }
            }
            const { data } = await chatUpdateMutation({
                variables: {
                    userId: Number(userId),
                    chatId: id ? id : userMessageId
                }
            });
            if (data?.chat_update?.success) {
                await refetch();
                // Optional: navigate after 2 seconds
                if (!id) {
                    setUserChat('');
                    setChatCurrentTextValue('');
                    navigate(`/chat/${userMessageId}`, {
                        state: { initialMessage: message }
                    });
                }
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    const onKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const currentValue = (e.currentTarget as HTMLInputElement).value;
            streamChat(currentValue);
        }
    };

    return (
        <div>
            <div className="w-full max-w-5xl m-auto">
                {!chatId && isLoading ? (
                    <div className="w-full max-w-5xl mb-4">
                        <div>
                            <div className={`my-4 p-3 rounded-md bg-[#000] text-[#fff] text-right max-w-[50%] ml-auto`}>
                                {userChat ?? '-'}
                            </div>
                        </div>
                        <div className={`my-2 p-3 rounded-md text-left max-w-[70%] mr-auto bg-[#e9e9e9b3]`}>
                            <Skeleton className="h-[80px] w-[50%] rounded-md" />
                        </div>
                    </div>
                ) : null}
                {!chatId && newChatStreamMessages?.length > 0 ? (
                    <div className="w-full max-w-5xl mb-4">
                        {newChatStreamMessages?.map((msg) => (
                            <div
                                key={msg.id}
                            >
                                {msg.role === 'user'
                                    ? (
                                        <div>
                                            <div className={`my-4 p-3 rounded-md bg-[#000] text-[#fff] text-right max-w-[50%] ml-auto`}>
                                                {chatCurrentTextValue ?? ''}
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div className={`my-2 p-3 rounded-md text-left max-w-[70%] mr-auto bg-[#e9e9e9b3]`}>
                                            <Markdown>{msg.content}</Markdown>
                                        </div>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                ) : null}
                {isLoading ?
                    (
                        <Skeleton className="max-h-[15rem] min-h-[7rem] w-[100%] rounded-xl" />
                    ) : (
                        <Textarea
                            placeholder="Ask Anything to Tintu :)"
                            className="rounded-xl overflow-scroll max-h-[15rem] min-h-[7rem]"
                            onKeyDown={onKeyDown}
                            onChange={(e) => {
                                setChatCurrentTextValue(e.target.value)
                                setUserChat(e.target.value);
                            }}
                            value={chatCurrentTextValue}
                        />
                    )}
            </div>
        </div>
    )
}