import { Link } from "react-router-dom";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "../../../../../components/ui/sidebar";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { useChatsTitle } from "./useChatsTitle";
import { groupBy } from "../../../../../utils";

function SidebarChatsWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SidebarGroup className="px-0!">
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarContent>
                {children}
            </SidebarContent>
        </SidebarGroup>
    )
}

export const SidebarChats = () => {
    const { loading, data, error } = useChatsTitle();
    if (loading) {
        return (
            <SidebarChatsWrapper>
                <Skeleton className="h-[24px] mx-2 bg-[#cdcdcd] rounded-md" />
                <Skeleton className="h-[24px] mx-2 bg-[#cdcdcd] rounded-md" />
                <Skeleton className="h-[24px] mx-2 bg-[#cdcdcd] rounded-md" />
            </SidebarChatsWrapper>
        )
    }
    if (error) {
        return (
            <SidebarChatsWrapper>
                <p className="leading-7 text-sm mx-2">
                    {error?.message}
                </p>
            </SidebarChatsWrapper>
        )
    }
    if (data?.getChatHistory?.length) {
        const messages = data?.getChatHistory;
        const userMessages = messages.filter(msg => msg.role === 'user');
        userMessages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const chats = groupBy(userMessages, 'chat_id');
        const chatValues = Object.values(chats);
        const flatValues = chatValues.flat(Infinity)  as ChatMessage[];
        if (flatValues?.length) {
            return (
                <SidebarChatsWrapper>
                    {flatValues?.map(item => {
                        return (
                            <Link
                                className="leading-7 text-sm mx-2 cursor-default truncate hover:bg-[#0000000f] cursor-pointer"
                                title={item?.content}
                                to={`/chat/${item?.id}`}
                                key={item?.id}
                            >
                                {item?.content}
                            </Link>
                        )
                    })}
                </SidebarChatsWrapper>
            )
        }
    }
    return (
        <SidebarChatsWrapper>
            <p className="leading-7 text-sm mx-2">
                No chats available
            </p>
        </SidebarChatsWrapper>
    )
}