import { create } from 'zustand';
import { createAuthSlice, type AuthSlice } from './auth-slice';
import { createChatSlice, type ChatSlice } from './chat-slice';

export const useBoundStore = create<AuthSlice & ChatSlice>()((...a) => ({
    ...createAuthSlice(...a),
    ...createChatSlice(...a),
}))