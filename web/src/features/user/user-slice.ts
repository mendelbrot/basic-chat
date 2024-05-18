import { createSlice } from "@reduxjs/toolkit";
import { User } from "./user-type";

const initialState: { draft: string; Users: User[] } = {
  draft: "",
  Users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
