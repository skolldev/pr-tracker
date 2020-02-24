import React from "react";
import { PRHelper } from "./helpers/pr-helper";
import { Base } from "./components/Base";
import { Input } from "./models/input.interface";

export const RetrievePR = (): JSX.Element => {
  const validateInput = (currentInput: Input): string | null => {
    const { weight, reps, exercise } = currentInput;

    if (!exercise) {
      return "Please choose an exercise!";
    }

    if ((!weight && !reps) || (weight && reps)) {
      return "Please enter either weight or reps";
    }

    if (weight && isNaN(+weight)) {
      return "The weight you entered is not a valid number!";
    }

    if (reps && isNaN(+reps)) {
      return "The reps you entered are not a valid number!";
    }

    return null;
  };

  return (
    <Base validateInput={validateInput} resultFuncs={[PRHelper.retrievePR]}>
      Enter an <strong>exercise</strong> and the <strong>reps</strong> or{" "}
      <strong>weight</strong> you want to check your PR for and the system will
      tell you!
    </Base>
  );
};
