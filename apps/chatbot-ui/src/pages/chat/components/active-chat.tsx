import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "../../../components/ui/skeleton";
import { UserChatSide } from "../../../features/chat-conversation/user-chat-side";
import { AssistantChatSide } from "../../../features/chat-conversation/assistant-chat-side";

const GET_CHAT_HISTORY = gql`
    query GetChatHistory($username: String!){
        getChatHistory(username: $username) {
            id
            role
            content
        }
    }
`

type UserChatMessageItem = Omit<ChatMessage, '__typename'>;

export const ActiveChat = () => {
    const [searchparams] = useSearchParams();
    const messageId = searchparams.get('message-id');
    const { loading, data, error } = useQuery(GET_CHAT_HISTORY, { variables: { username: localStorage.getItem('username') || '' } });
    if (!messageId) return null;
    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                <Skeleton className="h-[80px] w-[50%] rounded-md" />
                <Skeleton className="h-[80px] w-[50%] rounded-md self-end" />
                <Skeleton className="h-[80px] w-[50%] rounded-md" />
                <Skeleton className="h-[80px] w-[50%] rounded-md self-end" />
            </div>
        )
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div>
            <div>
                {data?.getChatHistory.length > 0 && (
                    <div className="w-full max-w-3xl mx-auto mb-4">
                        {data?.getChatHistory.map((msg: UserChatMessageItem) => (
                            <div
                                key={msg.id}
                            >
                                {msg.role === 'user'
                                    ? <UserChatSide message={msg} />
                                    : (
                                        <AssistantChatSide content={msg.content} />
                                    )
                                }
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}