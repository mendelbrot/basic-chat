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

const authUsrMgmtSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin(state, action: PayloadAction<signInPayload>) {
      state.signedInUser = action.payload.signedInUser;
      state.token = action.payload.token;
    },
  },
});

export const signin =
  (username: string, password: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    // TODO get current user and token
    const signedInUser: User = {
      id: 1,
      username: "user1",
      activeAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const token = "jwt-token...";
    dispatch(authUsrMgmtSlice.actions.signin({ signedInUser, token }));
  };

export default authUsrMgmtSlice.reducer;
