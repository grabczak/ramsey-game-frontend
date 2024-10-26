import { Provider } from "react-redux";

import { Graph } from "./components/Graph";
import { store } from "./store";

import "./index.css";

export function App() {
  return (
    <Provider store={store}>
      <Graph />
    </Provider>
  );
}
