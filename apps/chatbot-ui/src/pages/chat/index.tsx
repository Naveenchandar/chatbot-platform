import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar"
import { ChatSidebar } from "../../features/chat/components/sidebar";
import { MainWindow } from "../../features/chat/components/main-window";
import { useChat } from "../../features/chat/components/hooks";
import { Skeleton } from "../../components/ui/skeleton";

export const ChatPage = () => {
    const { loading, error } = useChat();
    if (loading) return <div><Skeleton /></div>
    if (error) return <div>Error: {error.message}</div>
    return (
        <SidebarProvider>
            <ChatSidebar />
            <SidebarInset>
                <main>
                    <MainWindow />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
