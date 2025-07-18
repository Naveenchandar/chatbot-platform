import { useChat } from "../hooks";

export const UserChatSide = () => {
    const { data } = useChat();
    const responseData = data?.getChatHistory;
    const userMessages = responseData?.filter(item => item.role === 'user');
    if (userMessages?.length) {
        return (
            <div>
                {userMessages?.map(item => {
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
