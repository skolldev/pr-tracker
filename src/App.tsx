import React, { useState } from "react";
import "./tailwind.css";
import logo from "./logo.svg";
import { EnterPR } from "./EnterPR";
import { RetrievePR } from "./RetrievePR";

import { ExerciseDataProvider } from "./ExerciseDataProvider";

enum States {
  ENTER,
  RETRIEVE
}
const App = (): JSX.Element => {
  const [state, setState] = useState(States.ENTER);

  const getContent = (currentState: States): JSX.Element => {
    switch (currentState) {
      case States.ENTER:
        return <EnterPR />;
      case States.RETRIEVE:
        return <RetrievePR />;
      default:
        return <p>Default</p>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="block lg:hidden h-8 w-auto" src={logo} alt="" />
                <img className="hidden lg:block h-8 w-auto" src={logo} alt="" />
                <h1 className="font-bold text-2xl ml-2 text-gray-700">
                  PR Tracker
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <main>
          <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 rounded-lg shadow">
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
              <div>
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex justify-center">
                    <button
                      onClick={(): void => setState(States.ENTER)}
                      className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm leading-5 focus:outline-none ${
                        state === States.ENTER
                          ? "text-indigo-600 focus:text-indigo-800 focus:border-indigo-700 border-indigo-500"
                          : "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 border-transparent"
                      }`}
                    >
                      Enter
                    </button>
                    <button
                      onClick={(): void => setState(States.RETRIEVE)}
                      className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm leading-5 focus:outline-none ${
                        state === States.RETRIEVE
                          ? "text-indigo-600 focus:text-indigo-800 focus:border-indigo-700 border-indigo-500"
                          : "text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 border-transparent"
                      }`}
                    >
                      Retrieve
                    </button>
                  </nav>
                </div>
              </div>
              <div className="mt-4 sm:w-2/3 mx-auto">
                <ExerciseDataProvider>
                  <div>{getContent(state)}</div>
                </ExerciseDataProvider>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
