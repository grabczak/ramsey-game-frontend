import { createBrowserRouter } from "react-router-dom";

import { Graph } from "src/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Graph />,
  },
]);
