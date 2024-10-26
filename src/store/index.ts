import { useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./game";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;

export const useAppSelector = useSelector.withTypes<TRootState>();

export type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>();

export * from "./game";
