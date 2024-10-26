import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { router } from "src/router";
import { store } from "src/store";

import "src/index.css";

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
