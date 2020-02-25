import React from "react";
import { PRHelper } from "./helpers/pr-helper";
import { Base } from "./components/Base";
import { Input } from "./models/input.interface";

export const EnterPR = (): JSX.Element => {
  const validateInput = (currentInput: Input): string | null => {
    const { weight, reps, exercise } = currentInput;

    if (!exercise) {
      return "Please choose an exercise!";
    }

    if (!weight) {
      return "Please enter the weight you lifted!";
    }

    if (!reps) {
      return "Please enter the reps you lifted!";
    }
    if (isNaN(+weight)) {
      return "The weight you entered is not a valid number!";
    }

    if (isNaN(+reps)) {
      return "The reps you entered are not a valid number!";
    }

    return null;
  };

  return (
    <Base
      validateInput={validateInput}
      resultFuncs={[
        PRHelper.checkExercisePR,
        PRHelper.checkRepetitionPR,
        PRHelper.checkWeightPR
      ]}
    >
      <>
        <p>
          You can enter the <strong>exercise</strong> you did and the{" "}
          <strong>reps</strong> and <strong>weight</strong> you lifted and the
          system will save your records.
        </p>
        <p>
          To delete all saved data for an exercise, simply enter{" "}
          <em>delete exerciseName</em> into the exercise field and press Go.
        </p>
      </>
    </Base>
  );
};
