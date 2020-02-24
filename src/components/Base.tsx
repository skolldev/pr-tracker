import React, { useState } from "react";
import {
  IExerciseDataContext,
  ExerciseDataConsumer
} from "../ExerciseDataProvider";
import { Styles } from "../css/styles";
import { EnterPRInput } from "../models/enter-pr-input.interface";
import { ILibrary } from "../models/library.interface";

interface Input {
  weight: string;
  reps: string;
  exercise: string;
}

interface Props {
  validateInput: (input: Input) => string | null;
  resultFuncs: ((data: ILibrary, pr: EnterPRInput) => string | null)[];
  children: React.ReactNode;
}

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
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    exerciseData: IExerciseDataContext
  ): void => {
    e.preventDefault();

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
              {result.map(r => (
                <p className="text-lg" key={r}>
                  {r}
                </p>
              ))}
              <button className={`${Styles.Button} mt-4`} onClick={reset}>
                Back
              </button>
            </div>
          ) : (
            <form onSubmit={(e): void => handleSubmit(e, exerciseData)}>
              <p>{props.children}</p>
              <div className="mt-4 grid gap-4 grid-cols-1">
                <label className="block">
                  <span className="block">Exercise</span>
                  <input
                    autoFocus
                    type="text"
                    name="exercise"
                    className={Styles.Input}
                    onChange={handleInput}
                    value={input.exercise}
                  />
                </label>
                <label className="block">
                  <span className="block">Weight</span>
                  <input
                    type="text"
                    name="weight"
                    className={Styles.Input}
                    onChange={handleInput}
                    value={input.weight}
                  />
                </label>
                <label className="block">
                  <span className="block">Reps</span>
                  <input
                    type="text"
                    name="reps"
                    className={Styles.Input}
                    onChange={handleInput}
                    value={input.reps}
                  />
                </label>
                {!error || (
                  <p className="p-2 bg-red-600 text-white col-span-1">
                    {error}
                  </p>
                )}
                <button className={`col-span-1 ${Styles.Button}`} type="submit">
                  Go!
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </ExerciseDataConsumer>
  );
};
