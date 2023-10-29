import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../main";
import { Message } from "./message";

const initialState: { draft: string | null; messages: Message[] } = {
  draft: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    typeMessage(state, action: PayloadAction<string>) {
      state.draft = action.payload;
    },
    sendMessage(state, action: PayloadAction<Message>) {
      state.draft = null;
      state.messages.push(action.payload);
    },
  },
});

export const typeMessage =
  (draft: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.typeMessage(draft));
  };

export const sendMessage =
  (content: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    // TODO send the message and get response
    const message: Message = {
      content: content,
      userId: 1,
      id: 44,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch(chatSlice.actions.sendMessage(message));
  };

export default chatSlice.reducer;
