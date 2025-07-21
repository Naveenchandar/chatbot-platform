import { gql } from "@apollo/client";

export const GET_CHAT_HISTORY = gql`
  query GetChatHistory($userId: Int!) {
    getChatHistory(user_id: $userId) {
      id
      role
      content
      chat_id
      created_at
      updated_at
    }
  }
`;