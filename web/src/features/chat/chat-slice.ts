import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch, RootState } from "../../main";
import { Message } from "./message-type";
import api from "../../lib/api";

const initialState: { draft: string; messages: Message[] } = {
  draft: "",
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    loadMessages(state, action: PayloadAction<Array<Message>>) {
      state.messages = action.payload;
    },
    typeMessage(state, action: PayloadAction<string>) {
      state.draft = action.payload;
    },
    sendMessage(state, action: PayloadAction<Message>) {
      state.draft = "";
      state.messages.push(action.payload);
    },
  },
});

export const loadMessages = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const messages = await api.loadMessages();

    dispatch(chatSlice.actions.loadMessages(messages));
  } catch (error) {
    return;
  }
};

export const typeMessage =
  (draft: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.typeMessage(draft));
  };

export const sendMessage =
  (): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const draft = getState().chat.draft;
      if (draft === "") {
        return;
      }

      const message = await api.sendMessage(draft);

      dispatch(chatSlice.actions.sendMessage(message));
    } catch (error) {
      return;
    }
  };

export default chatSlice.reducer;
