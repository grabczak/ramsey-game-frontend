import { createBrowserRouter } from "react-router-dom";

import { Graph, Settings } from "src/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Settings />,
  },
  {
    path: "/game",
    element: <Graph />,
  },
]);
