import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reducers from "./reducers";

export const store = configureStore({
  reducer: reducers,
  // this way we don't have to configure each middleware, all defaults and addons are left alone
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export type root_state = ReturnType<typeof store.getState>;
export type app_dispatch = typeof store.dispatch;
export const use_app_dispatch: () => app_dispatch = useDispatch;
export const use_app_selector: TypedUseSelectorHook<root_state> = useSelector;
