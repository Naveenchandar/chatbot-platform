import { Link } from "react-router-dom";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "../../../../../components/ui/sidebar";
import { Skeleton } from "../../../../../components/ui/skeleton";
import { useChatsTitle } from "./useChatsTitle";

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
        const userContents = data?.getChatHistory?.filter(item => item.role === 'user')?.[0];
        if (userContents?.content) {
            return (
                <SidebarChatsWrapper>
                    <Link
                        className="leading-7 text-sm mx-2 cursor-default truncate hover:bg-[#0000000f] cursor-pointer"
                        title={userContents?.content}
                        to={`/chat/${userContents?.id}`}
                    >
                        {userContents?.content}
                    </Link>
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