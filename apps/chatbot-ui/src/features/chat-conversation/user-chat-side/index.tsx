import type { Message } from "../types";

interface UserChatSideProps {
    message: Message
}

export const UserChatSide = ({ message }: UserChatSideProps) => {
    return (
        <div className="flex items-end justify-end">
            <div className={`my-2 p-3 rounded-md bg-[#000] text-[#fff] text-right max-w-[70%]`}>
                {message.content}
            </div>
        </div>
    );
}