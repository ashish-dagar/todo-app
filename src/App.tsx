import React, { useEffect, useState } from "react";
import "./App.css";
import CreateTodo from "./Todo";

const Product: any = React.lazy(() => import("MicroFrontend/Product"));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const getData = async () => {
    const result = await Product._payload._result();
    if (result) {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <span>Create Your ToDo's</span>
      <CreateTodo />
      {isLoaded && (
        <React.Suspense fallback={<h6>loading...</h6>}>
          <Product />
        </React.Suspense>
      )}
    </div>
  );
}

export default App;
