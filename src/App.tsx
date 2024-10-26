import { Provider } from "react-redux";

import { Graph } from "src/components";
import { store } from "src/store";

import "src/index.css";

export function App() {
  return (
    <Provider store={store}>
      <Graph />
    </Provider>
  );
}
