import { useParams } from "react-router-dom";
import { useChat } from "../hooks";
import { groupBy } from "../../../../utils";

export const UserChatSide = () => {
    const { data } = useChat();
    const responseData = data?.getChatHistory;
    const userMessages = responseData?.filter(item => item.role === 'user');
    const { id } = useParams();
    if (!id) return null;
    if (userMessages?.length) {
        userMessages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const chats = groupBy(userMessages, 'chat_id');
        const matchingChats = chats?.[id];
        const userChats = matchingChats?.filter(item => item.role === 'user');
        return (
            <div>
                {userChats?.map(item => {
                    return (
                        <div className={`my-4 p-3 rounded-md bg-[#000] text-[#fff] text-right max-w-[50%] ml-auto`} key={item?.id}>
                            {item?.content ?? ''}
                        </div>
                    )
                })}
            </div>
        )
    }
    return null
}
