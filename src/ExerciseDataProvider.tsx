import React, { createContext } from "react";
import { ILibrary } from "./models/library.interface";
import { useLocalStorage } from "./helpers/local-storage-state";

export interface IExerciseDataContext {
  data: ILibrary;
  updateData: (newData: ILibrary) => void;
}

const ExerciseDataContext = createContext<IExerciseDataContext>({
  data: {},
  updateData: () => {}
});

interface Props {
  children: React.ReactNode;
}

export const ExerciseDataProvider = (props: Props): JSX.Element => {
  const [data, updateData] = useLocalStorage("data", {});

  const state = {
    data,
    updateData
  };

  return (
    <ExerciseDataContext.Provider value={state}>
      {props.children}
    </ExerciseDataContext.Provider>
  );
};

export const ExerciseDataConsumer = ExerciseDataContext.Consumer;
