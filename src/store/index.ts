import { useSelector, useDispatch } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import gameReducer from "./game";

const persistConfig = { key: "game", version: 1, storage };

export const store = configureStore({
  reducer: {
    game: persistReducer<ReturnType<typeof gameReducer>>(
      persistConfig,
      gameReducer,
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

type TRootState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<TRootState>();

type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();

export * from "./game";
