import { createBrowserRouter } from "react-router-dom";

import { Graph, NotFound, Rules, Settings } from "src/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Settings />,
    errorElement: <NotFound />,
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
