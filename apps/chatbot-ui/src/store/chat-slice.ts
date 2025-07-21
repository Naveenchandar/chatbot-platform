import type { StateCreator } from "zustand"
import type { StreamMessage } from "../types/chat"

export interface ChatSlice {
    newChat: boolean,
    messages: StreamMessage[],
    updateNewChat: (value: boolean) => void,
    updateMessages: (value: StreamMessage) => void,
}

export const createChatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = (set) => ({
    newChat: false,
    messages: [],
    updateNewChat: (value: boolean) => set(() => ({
        newChat: value
    })),
    updateMessages: (value: StreamMessage) => set((state) => ({
        messages: [...state.messages, value]
    }))
})