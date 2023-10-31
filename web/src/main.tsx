import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Chatroom from "./pages/chatroom";
import SignIn from "./pages/auth/sign-in";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
import chatSlice from "./features/chat/chat-slice";
import authUserMgmtSlice from "./features/auth-usr-mgmt/auth-user-mgmt-slice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Chatroom />,
      },
    ],
  },
  {
    path: "auth/sign-in/",
    element: <SignIn />,
  },
]);

export const rootReducer = combineReducers({
  chat: chatSlice,
  user: authUserMgmtSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
