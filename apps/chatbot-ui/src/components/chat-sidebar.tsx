import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarRail,
} from "./ui/sidebar"
import { gql, useQuery } from "@apollo/client"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
  const { loading, data, error } = useQuery<GetChatHistoryResponse>(GET_CHAT_HISTORY, { variables: { username: localStorage.getItem('username') || '' } })
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  const userContents = data?.getChatHistory?.filter(item => item.role === 'user') || [];
  
  const renderChatTitle = (message: ChatMessage) => {
    const isToolTipRequired = message.content.length > 27;
    if (isToolTipRequired) {
      return (
        <Tooltip>
          <TooltipTrigger className="text-left">
            <p className="truncate hover:bg-[#0000000f] cursor-pointer rounded-md px-1 py-1 my-0.5" title="">{message.content}</p>
          </TooltipTrigger>
          <TooltipContent className="text-left">
            <p className="rounded-md px-1 py-1 my-0.5" title="">{message.content}</p>
          </TooltipContent>
        </Tooltip>
      )
    }
    return (
      <p className="truncate hover:bg-[#0000000f] cursor-pointer rounded-md px-1 py-1 my-0.5" title="">{message.content}</p>
    )
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {userContents?.map((message) => (
          <SidebarMenu key={message.id} className="px-3">
            {renderChatTitle(message)}
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
