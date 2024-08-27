import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/authSlice";
import bookReducer from "./features/book/bookSlice";

const persistConfig = {
  key: "auth",
  storage,
};
const bookPersistConfig = {
  key: "book",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedBookReducer = persistReducer(bookPersistConfig, bookReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    book: persistedBookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
