import { useLocation } from "react-router-dom"
import { AssistantChatSide } from "../assistant-chat-side"
import { UserChatSide } from "../user-chat-side"

export const ActiveChat = () => {
    const location = useLocation();
    const initialMessage = location.state?.initialMessage;
    // if(initialMessage)
    return (
        <>
            <UserChatSide />
            <AssistantChatSide />
        </>
    )
}