import { useQuery } from "@apollo/client"
import { getUserId } from "../../../../../utils";
import { GET_CHAT_HISTORY } from "../../../../../query";

export const useChatsTitle = () => {
    const userId = getUserId();
    const response = useQuery<GetChatHistoryResponse>(GET_CHAT_HISTORY,
        {
            variables: { userId: userId ? +userId : 0 },
            skip: !userId,
        })

    return response
}