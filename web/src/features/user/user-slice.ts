import { createSlice } from "@reduxjs/toolkit";
import { User } from "./user-type";

const initialState: { Users: User[] } = {
  Users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
