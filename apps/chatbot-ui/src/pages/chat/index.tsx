import { ChatSidebar } from "../../components/chat-sidebar"
import { Separator } from "../../components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { NewChat } from "../../features/new-chat"

export const ChatPage = () => {
    return (
        <SidebarProvider>
            <ChatSidebar />
            <SidebarInset>
                <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    abc
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {/* {Array.from({ length: 24 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-muted/50 aspect-video h-12 w-full rounded-lg"
                        />
                    ))} */}
                    <NewChat />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
