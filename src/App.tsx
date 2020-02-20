import React, { useState } from "react";
import "./tailwind.css";

enum States {
  NONE,
  NEW,
  RETRIEVE
}
const App = () => {
  const [state, setState] = useState(States.NEW);

  return (
    <div className="v-screen h-screen flex flex-col items-center font-sans antialiased p-8 bg-blue-900 text-white">
      {/* <h1 className="text-4xl font-bold">PR Tracker</h1> */}
      <div className="my-auto flex flex-col bg-white text-blue-900 max-w-xl rounded-lg shadow-md">
        <div className="flex w-full">
          <button
            onClick={(): void => setState(States.NEW)}
            className={`appearance-none focus:outline-none w-1/2 py-2 text-xl hover:bg-gray-300 hover:border-gray-300 rounded-tl-lg border-b-2 ${
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
            className={`appearance-none focus:outline-none w-1/2 py-2 text-xl hover:bg-gray-300 hover:border-gray-300 rounded-tr-lg border-b-2 ${
              state === States.RETRIEVE
                ? "bg-gray-400 border-gray-400"
                : "border-gray-300"
            }`}
          >
            Retrieve
          </button>
        </div>
        <div className="div p-8">
          {state === States.NEW ? (
            <EnterPR />
          ) : state === States.RETRIEVE ? (
            <RetrievePR />
          ) : (
            <p>Oops</p>
          )}
        </div>
      </div>
    </div>
  );
};

const EnterPR = (props: any) => {
  const [result, setResult] = useState(null);
  return result ? (
    <div>Wohoo!</div>
  ) : (
    <div className="grid gap-2 grid-cols-2">
      <input className="border-2 border-gray-400" />
      <input className="border-2 border-gray-400" />
      <input className="border-2 border-gray-400" />
    </div>
  );
};
const RetrievePR = (props: any) => <></>;

export default App;
