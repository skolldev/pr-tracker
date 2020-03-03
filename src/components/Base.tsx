import React, { useState } from "react";
import {
  IExerciseDataContext,
  ExerciseDataConsumer
} from "../ExerciseDataProvider";
import { EnterPRInput } from "../models/enter-pr-input.interface";
import { ILibrary } from "../models/library.interface";

interface Input {
  weight: string;
  reps: string;
  exercise: string;
}

interface Props {
  buttonText: string;
  validateInput: (input: Input) => string | null;
  resultFuncs: ((data: ILibrary, pr: EnterPRInput) => string | null)[];
  children: React.ReactNode;
}

// eslint-disable-next-line max-lines-per-function
export const Base = (props: Props): JSX.Element => {
  const [result, setResult] = useState<string[]>([]);
  const [input, setInput] = useState<Input>({
    weight: "",
    reps: "",
    exercise: ""
  });
  const [error, setError] = useState<string | null>(null);

  const handleInput = ({
    target
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const newState: any = { ...input };
    newState[target.name] = target.value;
    setInput(newState);
  };

  const reset = (): void => {
    setResult([]);
    setInput({
      weight: "",
      reps: "",
      exercise: ""
    });
    setError(null);
  };

  const deleteExercise = (
    { exercise }: Input,
    context: IExerciseDataContext
  ): void => {
    const { data, updateData } = context;
    const exerciseToDelete = exercise
      .trim()
      .split(" ")
      .slice(1)
      .join("")
      .toLowerCase();
    const newData = { ...data };
    delete newData[exerciseToDelete];
    updateData(newData);
    reset();
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    exerciseData: IExerciseDataContext
  ): void => {
    e.preventDefault();

    if (input.exercise.startsWith("delete")) {
      deleteExercise(input, exerciseData);
      return;
    }

    const errorMessage = props.validateInput(input);
    setError(errorMessage);
    if (errorMessage) {
      return;
    }

    const ex = input.exercise
      .toLowerCase()
      .trim()
      .replace(" ", "");

    const prData = { weight: +input.weight, exercise: ex, reps: +input.reps };

    const { data, updateData } = exerciseData;
    const results = props.resultFuncs
      .map(func => func(data, prData))
      .filter(v => v);
    if (results.length === 0) {
      results.push("Sorry, no PRs this time :( Keep at it!");
    }
    setResult(results as string[]);
    updateData(data);
  };

  return (
    <ExerciseDataConsumer>
      {(exerciseData): JSX.Element => (
        <>
          {result.length > 0 ? (
            <div className="flex flex-col text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Results
              </h3>
              {result.map(r => (
                <p
                  className="mt-1 max-w-2xl text-sm leading-5 text-gray-500"
                  key={r}
                >
                  {r}
                </p>
              ))}
              <button
                onClick={reset}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Back
              </button>
            </div>
          ) : (
            <form onSubmit={(e): void => handleSubmit(e, exerciseData)}>
              {props.children}
              <fieldset>
                <div className="mt-4 bg-white rounded-md shadow-sm">
                  <div>
                    <input
                      aria-label="Exercise name"
                      className="form-input relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      placeholder="Exercise name"
                      name="exercise"
                      value={input.exercise}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="-mt-px flex">
                    <div className="w-1/2 relative flex-1 min-w-0">
                      <input
                        autoComplete="off"
                        aria-label="Weight lifted"
                        className="form-input relative block w-full rounded-none rounded-bl-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5 pr-12 text-right"
                        placeholder="Weight"
                        name="weight"
                        type="number"
                        value={input.weight}
                        onChange={handleInput}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm sm:leading-5">
                          kg
                        </span>
                      </div>
                    </div>
                    <div className="-ml-px relative flex-1 min-w-0">
                      <input
                        autoComplete="off"
                        aria-label="Repetitions lifted"
                        className="form-input relative block w-full rounded-none rounded-br-md bg-transparent focus:z-10 transition ease-in-out duration-150 sm:text-sm sm:leading-5 pr-12 text-right"
                        placeholder="Reps"
                        name="reps"
                        type="number"
                        value={input.reps}
                        onChange={handleInput}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm sm:leading-5">
                          reps
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              {!error || <p className="mt-2 text-sm text-red-700">{error}</p>}
              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    {props.buttonText}
                  </button>
                </span>
              </div>
            </form>
          )}
        </>
      )}
    </ExerciseDataConsumer>
  );
};
