import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnterPR } from "../EnterPR";
import { ExerciseDataProvider } from "../ExerciseDataProvider";

test("should catch common errors", async () => {
  const { getByText, getByLabelText, queryByText } = render(
    <ExerciseDataProvider>
      <EnterPR />
    </ExerciseDataProvider>
  );

  const ex = getByLabelText(/exercise/i);
  const weight = getByLabelText(/weight/i);
  const reps = getByLabelText(/reps/i);
  const submit = getByText(/go/i);

  userEvent.click(submit);
  expect(getByText(/choose an exercise/i)).toBeInTheDocument();

  await userEvent.type(ex, "squat");
  userEvent.click(submit);
  expect(getByText(/enter the weight/i)).toBeInTheDocument();

  await userEvent.type(weight, "1");
  userEvent.click(submit);
  expect(getByText(/enter the reps/i)).toBeInTheDocument();

  await userEvent.type(reps, "2");
  userEvent.click(submit);
  expect(queryByText(/enter the reps/i)).not.toBeInTheDocument();
});

test("should allow user to enter PR", async () => {
  const { getByText, getByLabelText } = render(
    <ExerciseDataProvider>
      <EnterPR />
    </ExerciseDataProvider>
  );

  const ex = getByLabelText(/exercise/i);
  const weight = getByLabelText(/weight/i);
  const reps = getByLabelText(/reps/i);
  const submit = getByText(/go/i);

  await userEvent.type(ex, "squat");
  await userEvent.type(weight, "125");
  await userEvent.type(reps, "5");

  userEvent.click(submit);

  expect(
    getByText(/You set a new PR for squat with 125 x 5!/i)
  ).toBeInTheDocument();
});
