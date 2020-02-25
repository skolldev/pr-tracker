/* eslint-disable no-proto */
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import App from "../App";
import { TestHelper } from "../helpers/test-helper";

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, "setItem");
  window.localStorage.__proto__.setItem = jest.fn();
});

test("should be accessible", async () => {
  const { container } = render(<App />);
  const result = await axe(container);
  expect(result).toHaveNoViolations();
});

test("should catch common errors", async () => {
  const { getByText, getByLabelText } = render(<App />);

  userEvent.click(getByText(/retrieve/i));

  const ex = getByLabelText(/exercise/i);
  const weight = getByLabelText(/weight/i);
  const reps = getByLabelText(/reps/i);
  const submit = getByText(/go!/i);

  userEvent.click(submit);
  expect(getByText(/choose an exercise/i)).toBeInTheDocument();

  await userEvent.type(ex, "squat");
  userEvent.click(submit);
  expect(getByText(/enter either weight or reps/i)).toBeInTheDocument();

  await userEvent.type(weight, "asd");
  await userEvent.type(reps, "asd");
  userEvent.click(submit);
  expect(getByText(/enter either weight or reps/i)).toBeInTheDocument();
});

test("should allow user to enter and retrieve PR", async () => {
  const { getByText, getByLabelText } = render(<App />);

  await userEvent.type(getByLabelText(/exercise/i), "squat");
  await userEvent.type(getByLabelText(/weight/i), "125");
  await userEvent.type(getByLabelText(/reps/i), "5");
  userEvent.click(getByText(/go!/i));

  userEvent.click(getByText(/retrieve/i));
  await userEvent.type(getByLabelText(/exercise/i), "squat");
  await userEvent.type(getByLabelText(/weight/i), "125");
  userEvent.click(getByText(/go!/i));

  expect(getByText(/your current pr for 125 is 5 reps!/i));
});

test("should tell user if there are no records", async () => {
  const { getByText, getByLabelText } = render(<App />);

  userEvent.click(getByText(/retrieve/i));
  await userEvent.type(getByLabelText(/exercise/i), "squat");
  await userEvent.type(getByLabelText(/reps/i), "7");
  userEvent.click(getByText(/go!/i));

  expect(getByText(/you currently don't have any recorded prs for squat/i));

  userEvent.click(getByText(/new/i));

  await userEvent.type(getByLabelText(/exercise/i), "squat");
  await userEvent.type(getByLabelText(/weight/i), "125");
  await userEvent.type(getByLabelText(/reps/i), "5");
  userEvent.click(getByText(/go!/i));

  userEvent.click(getByText(/retrieve/i));
  await userEvent.type(getByLabelText(/exercise/i), "squat");
  await userEvent.type(getByLabelText(/reps/i), "7");
  userEvent.click(getByText(/go!/i));

  expect(
    getByText(/you currently don't have any recorded squat prs for 7 reps/i)
  );
});
