import { useQuery } from "@apollo/client"
import { GET_CHAT_HISTORY } from "../../../../query"
import { useParams } from "react-router-dom"
import { getUserId } from "../../../../utils";

export const useChat = () => {
    const { id: chatId } = useParams();
    const userId = getUserId();
    const response = useQuery<GetChatHistoryResponse>(GET_CHAT_HISTORY,
        {
            variables: { userId: userId ? +userId : 0 },
            skip: !chatId || !userId,
        })

    return response
}