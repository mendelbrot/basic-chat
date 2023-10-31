import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "../../main";
import { User } from "./user";

const initialState: {
  signedInUser: User | null;
  token: string | null;
  users: User[];
} = {
  signedInUser: null,
  token: null,
  users: [],
};

type signInPayload = {
  signedInUser: User;
  token: string;
};

const authUserMgmtSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<signInPayload>) {
      state.signedInUser = action.payload.signedInUser;
      state.token = action.payload.token;
    },
  },
});

export const signIn =
  (username: string, password: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    // TODO get current user and token
    const signedInUser: User = {
      id: 1,
      username: "user1",
      activeAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const token = "jwt-token...";
    // redirect to chat page

    dispatch(authUserMgmtSlice.actions.signIn({ signedInUser, token }));
  };

export default authUserMgmtSlice.reducer;