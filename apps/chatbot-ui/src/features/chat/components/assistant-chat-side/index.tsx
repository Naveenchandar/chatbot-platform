import Markdown from "react-markdown"
import { useChat } from "../hooks";

export const AssistantChatSide = () => {
    const { data } = useChat();
    const responseData = data?.getChatHistory;
    const assistantMessages = responseData?.filter(item => item.role === 'assistant');
    if (assistantMessages?.length) {
        return (
            <div>
                {assistantMessages?.map(item => {
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
