import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Bar from "./components/Bar";
import Nav from "./components/Nav";
import New from "./components/New";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <Nav/>
      <New/>
      <Bar/>
    </>
  );
}

export default App;
