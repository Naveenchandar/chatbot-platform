import { MainChatLayout } from "../../features/main-chat"
import { ChatSidebar } from "../../features/sidebar"

export const ChatPage = () => {
    return (
        <section className="w-full flex">
            <div className="w-full h-screen flex">
                <div className="w-[300px] h-screen bg-white border border-gray-200 p-4 shadow-md bg-[#ececec]">
                    <ChatSidebar />
                </div>
                <div className="mx-4">
                    <MainChatLayout />
                </div>
            </div>
        </section>
    )
}