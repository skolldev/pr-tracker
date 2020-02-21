import React, { useState } from "react";
import "./tailwind.css";
import { EnterPR } from "./EnterPR";
import { RetrievePR } from "./RetrievePR";
import { Styles } from "./css/styles";
import DataContext from "./DataContext";

enum States {
  NONE,
  NEW,
  RETRIEVE
}
const App = (): JSX.Element => {
  const [state, setState] = useState(States.NEW);

  const getContent = (currentState: States): JSX.Element => {
    switch (currentState) {
      case States.NEW:
        return <EnterPR />;
      case States.RETRIEVE:
        return <RetrievePR />;
      default:
        return <p>Default</p>;
    }
  };

  return (
    <div className="v-screen h-screen flex flex-col items-center font-sans antialiased p-8 bg-blue-900 text-white">
      <h1 className="text-4xl font-bold">PR Tracker</h1>
      <div className="my-auto flex flex-col bg-white text-blue-900 max-w-xl rounded-lg shadow-md">
        <div className="flex w-full">
          <button
            onClick={(): void => setState(States.NEW)}
            className={`${Styles.Tab} rounded-tl-lg  ${
              state === States.NEW
                ? "bg-gray-400 border-gray-400"
                : "border-gray-300"
            }`}
          >
            New
          </button>
          <div
            className={`border-r-2 ${
              state === States.NONE ? "border-gray-300" : "border-gray-400"
            }`}
          />
          <button
            onClick={(): void => setState(States.RETRIEVE)}
            className={`${Styles.Tab} rounded-tr-lg ${
              state === States.RETRIEVE
                ? "bg-gray-400 border-gray-400"
                : "border-gray-300"
            }`}
          >
            Retrieve
          </button>
        </div>
        <DataContext.Provider value={{}}>
          <div className="div p-8">{getContent(state)}</div>
        </DataContext.Provider>
      </div>
    </div>
  );
};

export default App;
