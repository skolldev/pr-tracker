/* eslint-disable no-proto */
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { EnterPR } from "../EnterPR";
import { ExerciseDataProvider } from "../ExerciseDataProvider";

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, "setItem");
  window.localStorage.__proto__.setItem = jest.fn();
});

test("should be accessible", async () => {
  const { container } = render(<EnterPR />);
  const result = await axe(container);
  expect(result).toHaveNoViolations();
});

test("should catch common errors", async () => {
  const { getByText, getByPlaceholderText, queryByText } = render(
    <ExerciseDataProvider>
      <EnterPR />
    </ExerciseDataProvider>
  );

  const ex = getByPlaceholderText(/exercise name/i);
  const weight = getByPlaceholderText(/weight/i);
  const reps = getByPlaceholderText(/reps/i);
  const submit = getByText(/save$/i);

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
  const { getByText, getByPlaceholderText } = render(
    <ExerciseDataProvider>
      <EnterPR />
    </ExerciseDataProvider>
  );

  await userEvent.type(getByPlaceholderText(/exercise/i), "squat");
  await userEvent.type(getByPlaceholderText(/weight/i), "125");
  await userEvent.type(getByPlaceholderText(/reps/i), "5");
  userEvent.click(getByText(/save$/i));

  expect(
    getByText(/You set a new PR for squat with 125 x 5!/i)
  ).toBeInTheDocument();

  userEvent.click(getByText(/back/i));

  await userEvent.type(getByPlaceholderText(/exercise/i), "squat");
  await userEvent.type(getByPlaceholderText(/weight/i), "125");
  await userEvent.type(getByPlaceholderText(/reps/i), "5");
  userEvent.click(getByText(/save$/i));

  expect(getByText(/sorry, no prs/i)).toBeInTheDocument();
});

test("should track weight PRs and repetition PRs", async () => {
  const { getByText, getByPlaceholderText } = render(
    <ExerciseDataProvider>
      <EnterPR />
    </ExerciseDataProvider>
  );

  await userEvent.type(getByPlaceholderText(/exercise/i), "squat");
  await userEvent.type(getByPlaceholderText(/weight/i), "125");
  await userEvent.type(getByPlaceholderText(/reps/i), "5");
  userEvent.click(getByText(/save$/i));

  expect(
    getByText(/You set a new PR for squat with 125 x 5!/i)
  ).toBeInTheDocument();

  userEvent.click(getByText(/back/i));

  await userEvent.type(getByPlaceholderText(/exercise/i), "squat");
  await userEvent.type(getByPlaceholderText(/weight/i), "120");
  await userEvent.type(getByPlaceholderText(/reps/i), "5");
  userEvent.click(getByText(/save$/i));

  expect(
    getByText(/You set a new weight PR for squat with 120 x 5!/i)
  ).toBeInTheDocument();

  userEvent.click(getByText(/back/i));

  await userEvent.type(getByPlaceholderText(/exercise/i), "squat");
  await userEvent.type(getByPlaceholderText(/weight/i), "125");
  await userEvent.type(getByPlaceholderText(/reps/i), "6");
  userEvent.click(getByText(/save$/i));

  expect(
    getByText(/You set a new repetition PR for squat with 125 x 6/i)
  ).toBeInTheDocument();
});
