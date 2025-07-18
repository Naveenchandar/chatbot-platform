import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
} from "../../../components/ui/sidebar"
import { gql, useQuery } from "@apollo/client"
import Image1 from '../../../assets/images/tintu_logo.png';
import { SidebarChats } from "./sidebar-chats";
import { NewChatOption } from "./new-chat-option";

const GET_CHAT_HISTORY = gql`
  query GetChatHistory($username: String!) {
    getChatHistory(username: $username) {
      id
      role
      content
    }
  }
`;

export function ChatSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { loading, error } = useQuery<GetChatHistoryResponse>(GET_CHAT_HISTORY, { variables: { username: localStorage.getItem('username') || '' } })
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <Sidebar {...props}>
      <SidebarGroup className="px-0!">
        <SidebarGroupLabel className="px-!">
          <img src={Image1} alt="Chatbot Logo" className="h-[50px]" />
        </SidebarGroupLabel>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarContent>
          <SidebarMenu>
            <NewChatOption />
          </SidebarMenu>
        </SidebarContent>
      </SidebarGroup>
      <SidebarGroup className="px-0!">
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        <SidebarContent>
          <SidebarChats />
        </SidebarContent>
      </SidebarGroup>
      <SidebarRail />
    </Sidebar>
  )
}
