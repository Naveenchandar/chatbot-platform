import { gql, type TypedDocumentNode } from "@apollo/client";

interface ChatUpdateData {
    chat_update: {
        success: boolean;
        message: string;
    };
}

interface ChatUpdateVars {
    userId: number;
    chatId: string;
}

export const CHAT_UPDATE: TypedDocumentNode<ChatUpdateData, ChatUpdateVars> = gql` 
    mutation CHATUPDATE($userId:Int!, $chatId:String!) {
        chat_update(user_id:$userId, chat_id: $chatId) {
            success
            message
        }
    }
`