import React, { createContext, Component } from "react";
import { ILibrary } from "./models/library.interface";
import { useLocalStorage } from "./local-storage-state";

export interface IExerciseDataContext {
  data: ILibrary;
  updateData: (newData: ILibrary) => void;
}

const ExerciseDataContext = createContext<IExerciseDataContext>({
  data: {},
  updateData: () => {}
});

interface Props {
  children: Component;
}

export const ExerciseDataProvider = (props: any) => {
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
