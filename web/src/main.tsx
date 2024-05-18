import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./layout";
import Chatroom from "./pages/chatroom";
import Login from "./features/auth/login";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
import chatSlice from "./features/chat/chat-slice";
import userSlice from "./features/user/user-slice";
import ProtectedRoute from "./features/auth/protected-route";
import AuthProvider from "./features/auth/auth-provider";
import { Route, Switch } from "wouter";

export const rootReducer = combineReducers({
  chat: chatSlice,
  user: userSlice,
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
        <Switch>
          <Route path="/">
            <ProtectedRoute>
              <Layout>
                <Chatroom />
              </Layout>
            </ProtectedRoute>
          </Route>
        </Switch>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
