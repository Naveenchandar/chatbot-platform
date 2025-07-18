import { useQuery } from "@apollo/client"
import { getUsername } from "../../../../../utils";
import { GET_CHAT_HISTORY } from "../../../../../query";

export const useChatsTitle = () => {
    const username = getUsername();
    const response = useQuery<GetChatHistoryResponse>(GET_CHAT_HISTORY,
        {
            variables: { username: username },
            skip: !username,
        })

    return response
}