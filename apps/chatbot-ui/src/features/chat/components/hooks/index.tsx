import { useQuery } from "@apollo/client"
import { GET_CHAT_HISTORY } from "../../../../query"

export const useChat = () => {
    const response = useQuery<GetChatHistoryResponse>(GET_CHAT_HISTORY,
    {
        variables:
            { username: localStorage.getItem('username') || '' }
    })

    return response
}