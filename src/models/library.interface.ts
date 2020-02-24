import { IExerciseData } from "./exercise-rep-data.interface";

export interface ILibrary {
  [exercise: string]: IExerciseData;
}
