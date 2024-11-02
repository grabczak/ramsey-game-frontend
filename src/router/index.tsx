import { createBrowserRouter } from "react-router-dom";

import { Graph, Rules, Settings } from "src/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Settings />,
  },
  {
    path: "/rules",
    element: <Rules />,
  },
  {
    path: "/game",
    element: <Graph />,
  },
]);
