import React, { createContext } from "react";
import { ILibrary } from "./models/library.interface";

export interface IExerciseDataContext {
  data: ILibrary;
  updateData: (newData: ILibrary) => void;
}

const ExerciseDataContext = createContext<IExerciseDataContext>({
  data: {},
  updateData: () => {}
});

export class ExerciseDataProvider extends React.Component<
  {},
  IExerciseDataContext
> {
  updateData = (newData: ILibrary): void => {
    this.setState({ data: newData });
  };

  state = {
    data: {},
    updateData: this.updateData
  };

  render(): JSX.Element {
    return (
      <ExerciseDataContext.Provider value={this.state}>
        {this.props.children}
      </ExerciseDataContext.Provider>
    );
  }
}

export const ExerciseDataConsumer = ExerciseDataContext.Consumer;
