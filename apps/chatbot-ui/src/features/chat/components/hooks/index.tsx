import { useQuery } from "@apollo/client"
import { GET_CHAT_HISTORY } from "../../../../query"
import { useParams } from "react-router-dom"
import { getUsername } from "../../../../utils";

export const useChat = () => {
    const { id: chatId } = useParams();
    const username = getUsername();
    const response = useQuery<GetChatHistoryResponse>(GET_CHAT_HISTORY,
        {
            variables: { username: username },
            skip: !chatId || !username,
        })

    return response
}