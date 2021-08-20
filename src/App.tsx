import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { initProxy } from 'commandbar';

initProxy();

function App() {
  const [load, setLoad] = useState(false);

  console.log('Safely call and queue window.CommandBar methods before lazy import...', window.CommandBar.boot);

  useEffect(() => {
    if (load === false) return;

    import("@commandbar/foobar")
      .then(({ init }) => {
        init("42424242", "test-org");
        window.CommandBar.boot("test-user");
      })
      .catch((err) => {
        console.warn("failed to load commandbar");
        throw err;
      });
  }, [load]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="#_"
          onClick={(ev) => {
            ev.preventDefault();
            setLoad(true);
          }}
        >
          Load CommandBar
        </a>
      </header>
    </div>
  );
}

export default App;
