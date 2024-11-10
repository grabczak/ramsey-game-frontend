import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import "@xyflow/react/dist/style.css";

import { queryClient } from "src/api";
import { router } from "src/router";
import { store } from "src/store";

import "src/index.css";

export function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}
