import React, { useState } from "react";
import { Styles } from "./css/styles";

interface Input {
  weight: string;
  reps: string;
  exercise: string;
}

export const EnterPR = (props: any): JSX.Element => {
  const [result, setResult] = useState<string | null>(null);
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
    setResult(null);
    setInput({
      weight: "",
      reps: "",
      exercise: ""
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const isValid = validateInput(input);
    if (!isValid) {
      return;
    }
    setResult("New PR!");
  };

  return result ? (
    <div>
      Wohoo! {result}
      <button onClick={reset}>Back</button>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <p>
        You can enter either <strong>reps</strong> or <strong>weight</strong>{" "}
        and the system will tell you your current records for that parameter.
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
          <p className="p-2 bg-red-600 text-white col-span-1">{error}</p>
        )}
        <button className="col-span-1" type="submit">
          Go!
        </button>
      </div>
    </form>
  );
};
