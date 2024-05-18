import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Chatroom from "./pages/chatroom";
import Login from "./pages/auth/login";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
import chatSlice from "./features/chat/chat-slice";
import authUserMgmtSlice from "./features/user/auth-user-mgmt-slice";
import ProtectedRoute from "./features/auth/protected-route";
import AuthProviderOutlet from "./features/auth/auth-provider-outlet";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProviderOutlet>
        <Layout />
      </AuthProviderOutlet>
    ),
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Chatroom />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Layout />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
        ],
      },
    ],
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
