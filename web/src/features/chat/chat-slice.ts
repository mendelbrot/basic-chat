import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch, RootState } from "../../main";
import { Message } from "./message-type";

const initialState: { draft: string; messages: Message[] } = {
  draft: "",
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
      state.draft = "";
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
  (): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
    const draft = getState().chat.draft;
    if (draft === "") {
      return;
    }
    // TODO send the message and get response
    const message: Message = {
      content: draft,
      userId: 1,
      id: 44,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(chatSlice.actions.sendMessage(message));
  };

export default chatSlice.reducer;
