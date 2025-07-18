import { useLocation, useParams } from "react-router-dom";
import { useChat } from "../hooks";
import { Skeleton } from "../../../../components/ui/skeleton";
import { AssistantChatSide } from "../assistant-chat-side";
import { UserChatSide } from "../user-chat-side";
import { ActiveChat } from "../active-chat";

function ChatWindowWrapper({ children }: { children: React.ReactNode }) {
    return (
        <section className="w-full max-w-5xl m-auto">
            {children ?? null}
        </section>
    )
}

export const ChatWindow = () => {
    const params = useParams();
    const chatId = params?.id;
    const location = useLocation();
    const { data, loading, error } = useChat();
    const initialMessage = location.state?.initialMessage;
    if (!chatId) {
        return (
            <h1 className="text-center my-7 text-xl">
                Tell Tintu what's on your mind 🤖
            </h1>
        )
    }
    if (loading) {
        return (
            <ChatWindowWrapper>
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-[80px] w-[50%] bg-[#cdcdcd] rounded-md" />
                    <Skeleton className="h-[80px] w-[50%] bg-[#cdcdcd] rounded-md self-end" />
                    <Skeleton className="h-[80px] w-[50%] bg-[#cdcdcd] rounded-md" />
                    <Skeleton className="h-[80px] w-[50%] bg-[#cdcdcd] rounded-md self-end" />
                </div>
            </ChatWindowWrapper>
        )
    }
    if (error) {
        return (
            <ChatWindowWrapper>
                <p className="text-md leading-7 text-red-500">
                    {error?.message}
                </p>
            </ChatWindowWrapper>
        )
    }
    if (data?.getChatHistory?.length) {
        return (
            <ChatWindowWrapper>
                <ActiveChat />
            </ChatWindowWrapper>
        )
    }
    return null
}