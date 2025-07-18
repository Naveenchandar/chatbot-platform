import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarRail
} from "../../../../components/ui/sidebar";
import Logo from '../../../../assets/images/tintu_logo.png';
import { SidebarChats } from "./chats";

export const SidebarLayout = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar {...props}>
            <SidebarGroup className="px-0!">
                <SidebarGroupLabel className="px-!">
                    <img src={Logo} alt="Chatbot Logo" className="h-[50px]" />
                </SidebarGroupLabel>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarContent>
                    <SidebarMenu>
                        {/* <NewChatOption /> */}
                        New chat
                    </SidebarMenu>
                </SidebarContent>
            </SidebarGroup>
            <SidebarChats />
            <SidebarRail />
        </Sidebar>
    )
}