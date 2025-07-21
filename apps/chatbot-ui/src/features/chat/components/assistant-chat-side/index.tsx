import Markdown from "react-markdown"
import { useChat } from "../hooks";
import { groupBy } from "../../../../utils";
import { useParams } from "react-router-dom";

export const AssistantChatSide = () => {
    const { data } = useChat();
    const { id } = useParams();
    if (!id) return null;
    const responseData = data?.getChatHistory;
    const assistantMessages = responseData?.filter(item => item.role === 'assistant');
    if (assistantMessages?.length) {
        assistantMessages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const chats = groupBy(assistantMessages, 'chat_id');
        const matchingChats = chats?.[id];
        const assistantChats = matchingChats?.filter(item => item.role === 'assistant');
        return (
            <div>
                {assistantChats?.map(item => {
                    return (
                        <div className={`my-2 p-3 rounded-md text-left} bg-[#e9e9e9b3]`} key={item?.id}>
                            <Markdown>{item?.content}</Markdown>
                        </div>
                    )
                })}
            </div>
        )
    }
    return null;
}
