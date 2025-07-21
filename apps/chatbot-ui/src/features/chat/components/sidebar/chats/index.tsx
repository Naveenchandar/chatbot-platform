import { NavLink } from "react-router-dom";
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
        const firstMessageOfChats = chatValues?.map(item => item?.[0]);
        if (firstMessageOfChats?.length) {
            return (
                <SidebarChatsWrapper>
                    {firstMessageOfChats?.map(item => {
                        return (
                            <NavLink
                                // className="leading-7 text-sm mx-2 cursor-default truncate hover:bg-[#0000000f] cursor-pointer"
                                className={({ isActive }) =>
                                    isActive ? "leading-7 text-sm mx-2 cursor-default truncate bg-[#0000000f] cursor-pointer" : "leading-7 text-sm mx-2 cursor-default truncate hover:bg-[#0000000f] cursor-pointer"
                                }
                                title={item?.content}
                                to={`/chat/${item?.chat_id}`}
                                key={item?.id}
                            >
                                {item?.content}
                            </NavLink>
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