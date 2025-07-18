import { gql, useQuery } from "@apollo/client"
import { ChatSidebar } from "./components/chat-sidebar"
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar"
import { useSearchParams } from "react-router-dom";
import { ActiveChat } from "./components/active-chat";
import { Header } from "./components/main-window/header";
import { NewChat } from "../../features/chat-conversation";

const GET_CHAT_HISTORY = gql`
  query GetChatHistory($username: String!) {
    getChatHistory(username: $username) {
      id
      role
      content
    }
  }
`;

export const ChatPage = () => {
    const { loading, data, error } = useQuery<GetChatHistoryResponse>(GET_CHAT_HISTORY, { variables: { username: localStorage.getItem('username') || '' } })
    const [searchparams] = useSearchParams();
    const isNewChat = searchparams.get('new-chat') === 'true';
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    const userContents = data?.getChatHistory?.filter(item => item.role === 'user' && Boolean(item.content)) || [];
    return (
        <SidebarProvider>
            <ChatSidebar />
            <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 h-full w-full">
                    <div>
                        <Header />
                    </div>
                    {!isNewChat
                        ? (
                            <div className="h-[67vh] overflow-auto">
                                <ActiveChat />
                            </div>
                        )
                        : (
                            <div>
                                <NewChat />
                            </div>
                        )
                    }
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
