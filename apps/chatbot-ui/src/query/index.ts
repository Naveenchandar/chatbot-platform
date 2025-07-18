import { gql } from "@apollo/client";

export const GET_CHAT_HISTORY = gql`
  query GetChatHistory($username: String!) {
    getChatHistory(username: $username) {
      id
      role
      content
    }
  }
`;