import { IExerciseData } from "./exercise-data.interface";

export interface ILibrary {
  [exercise: string]: IExerciseData;
}
