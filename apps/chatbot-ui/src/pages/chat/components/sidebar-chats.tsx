import { gql, useQuery } from "@apollo/client"
import { SidebarMenu } from "../../../components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router-dom";

const GET_CHAT_HISTORY = gql`
  query GetChatHistory($username: String!) {
    getChatHistory(username: $username) {
      id
      role
      content
    }
  }
`;

export const SidebarChats = () => {
    const { loading, data, error } = useQuery<GetChatHistoryResponse>(GET_CHAT_HISTORY, { variables: { username: localStorage.getItem('username') || '' } })
    const navigate = useNavigate();

    if (loading || error) return null;

    // const userContents = data?.getChatHistory?.filter(item => item.role === 'user' && Boolean(item.content)) || [];
    const userContents = data?.getChatHistory?.[1];
    console.log('userContents', userContents);

    const openChatWithDetails = (message: ChatMessage) => {
        const searchparams = new URLSearchParams();;
        searchparams.append("message-id", String(message.id));
        navigate(`/chat?${searchparams.toString()}`)
    }

    const renderChatTitle = (message: ChatMessage) => {
        const isToolTipRequired = message.content.length > 27000;
        const originalContent = <p
            className="truncate hover:bg-[#0000000f] cursor-pointer rounded-md px-1 py-1 my-0.5 text-md"
            onClick={() => openChatWithDetails(message)}
        >{message.content}</p>
        if (isToolTipRequired) {
            return (
                <Tooltip>
                    <TooltipTrigger className="text-left">
                        {originalContent}
                    </TooltipTrigger>
                    <TooltipContent className="text-left">
                        <p className="rounded-md px-1 py-1 my-0.5 text-md">{message.content}</p>
                    </TooltipContent>
                </Tooltip>
            )
        }
        return originalContent
    }

    // return userContents?.map((message) => (
    //     <SidebarMenu key={message.id} className="px-3">
    //         {renderChatTitle(message)}
    //     </SidebarMenu>
    // ))
    return <SidebarMenu key={userContents?.content} className="px-3">
        {renderChatTitle(userContents?.content ? userContents : { id: 0, role: 'user', content: 'No chats available', __typename: 'ChatMessage' } )}
    </SidebarMenu>
}