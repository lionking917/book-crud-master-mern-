import { configureStore } from "@reduxjs/toolkit";
import booksApi from "./services/books";
import authSlice from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [booksApi.reducerPath]: booksApi.reducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(booksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
