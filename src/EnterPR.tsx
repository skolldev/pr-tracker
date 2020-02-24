/* eslint-disable max-lines-per-function */
import React, { useState } from "react";
import { Styles } from "./css/styles";
import {
  ExerciseDataConsumer,
  IExerciseDataContext
} from "./ExerciseDataProvider";
import { EnterPRInput } from "./models/enter-pr-input.interface";
import { ILibrary } from "./models/library.interface";

interface Input {
  weight: string;
  reps: string;
  exercise: string;
}

export const EnterPR = (props: any): JSX.Element => {
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

  const validateInput = (currentInput: Input): boolean => {
    const { weight, reps, exercise } = currentInput;

    if (!exercise) {
      setError("Please choose an exercise!");
      return false;
    }

    if (!weight) {
      setError("Please enter the weight you lifted!");
      return false;
    }

    if (!reps) {
      setError("Please enter the reps you lifted!");
      return false;
    }
    if (isNaN(+weight)) {
      setError("The weight you entered is not a valid number!");
      return false;
    }

    if (isNaN(+reps)) {
      setError("The reps you entered are not a valid number!");
      return false;
    }

    setError(null);
    return true;
  };

  const reset = (): void => {
    setResult([]);
    setInput({
      weight: "",
      reps: "",
      exercise: ""
    });
  };

  const checkExercisePR = (data: ILibrary, pr: EnterPRInput): string | null => {
    const { exercise, weight, reps } = pr;
    if (!data[exercise]) {
      data[exercise] = { weight: {}, reps: {} };
      data[exercise].reps[reps] = weight;
      data[exercise].weight[weight] = reps;
      return `Congrats! You set a new PR for ${exercise} with ${weight} x ${reps}!`;
    }
    return null;
  };

  const checkRepetitionPR = (
    data: ILibrary,
    pr: EnterPRInput
  ): string | null => {
    const { exercise, weight, reps } = pr;
    if (!data[exercise].reps[reps]) {
      data[exercise].reps[reps] = weight;
      return `Congrats! You set a new repetition PR for ${exercise} with ${weight}x${reps}!`;
    }

    const previousRecord = data[exercise].reps[reps];
    if (previousRecord < +weight) {
      data[exercise].reps[reps] = weight;
      return `Congrats! You set a new repetition PR for ${exercise} with ${weight}x${reps}, beating your previous record of ${previousRecord} x ${reps}!`;
    }

    return null;
  };

  const checkWeightPR = (data: ILibrary, pr: EnterPRInput): string | null => {
    const { exercise, weight, reps } = pr;
    if (!data[exercise].weight[weight]) {
      data[exercise].weight[weight] = weight;
      return `Congrats! You set a new weight PR for ${exercise} with ${weight}x${reps}!`;
    }

    const previousRecord = data[exercise].weight[weight];
    if (previousRecord < +reps) {
      data[exercise].weight[weight] = weight;
      return `Congrats! You set a new weight PR for ${exercise} with ${weight}x${reps}, beating your previous record of ${weight} x ${previousRecord}!`;
    }

    return null;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    exerciseData: IExerciseDataContext
  ): void => {
    e.preventDefault();

    const isValid = validateInput(input);
    if (!isValid) {
      return;
    }

    const ex = input.exercise
      .toLowerCase()
      .trim()
      .replace(" ", "");

    const prData = { weight: +input.weight, exercise: ex, reps: +input.reps };

    const { data, updateData } = exerciseData;
    const results = [
      checkExercisePR(data, prData),
      checkRepetitionPR(data, prData),
      checkWeightPR(data, prData)
    ].filter(v => v);
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
            <div className="flex flex-col">
              {result.map(r => (
                <p key={r}>{r}</p>
              ))}
              <button onClick={reset}>Back</button>
            </div>
          ) : (
            <form onSubmit={(e): void => handleSubmit(e, exerciseData)}>
              <p>
                You can enter either <strong>reps</strong> or{" "}
                <strong>weight</strong> and the system will tell you your
                current records for that parameter.
              </p>
              <div className="mt-4 grid gap-4 grid-cols-1">
                <label className="block">
                  <span className="block">Exercise</span>
                  <input
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
                <button className="col-span-1" type="submit">
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
