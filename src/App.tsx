import { useState, useEffect } from "react";

import { play } from "./api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    play()
      .then((r) => setMessage(r.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>{message}</div>
    </div>
  );
}

export default App;
