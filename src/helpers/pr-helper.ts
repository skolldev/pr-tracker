import { ILibrary } from "../models/library.interface";

import { EnterPRInput } from "../models/enter-pr-input.interface";

export class PRHelper {
  static checkExercisePR(data: ILibrary, pr: EnterPRInput): string | null {
    const { exercise, weight, reps } = pr;
    if (!data[exercise]) {
      data[exercise] = { weight: {}, reps: {} };
      data[exercise].reps[reps] = weight;
      data[exercise].weight[weight] = reps;
      return `Congrats! You set a new PR for ${exercise} with ${weight} x ${reps}!`;
    }
    return null;
  }

  static checkRepetitionPR(data: ILibrary, pr: EnterPRInput): string | null {
    const { exercise, weight, reps } = pr;
    if (!data[exercise].reps[reps]) {
      data[exercise].reps[reps] = weight;
      return `Congrats! You set a new repetition PR for ${exercise} with ${weight} x ${reps}!`;
    }

    const previousRecord = data[exercise].reps[reps];
    if (previousRecord < +weight) {
      data[exercise].reps[reps] = weight;
      return `Congrats! You set a new repetition PR for ${exercise} with ${weight}x${reps}, beating your previous record of ${previousRecord} x ${reps}!`;
    }

    return null;
  }

  static checkWeightPR(data: ILibrary, pr: EnterPRInput): string | null {
    const { exercise, weight, reps } = pr;
    if (!data[exercise].weight[weight]) {
      data[exercise].weight[weight] = reps;
      return `Congrats! You set a new weight PR for ${exercise} with ${weight} x ${reps}!`;
    }

    const previousRecord = data[exercise].weight[weight];
    if (previousRecord < +reps) {
      data[exercise].weight[weight] = reps;
      return `Congrats! You set a new weight PR for ${exercise} with ${weight} x ${reps}, beating your previous record of ${weight} x ${previousRecord}!`;
    }

    return null;
  }

  static retrievePR(data: ILibrary, pr: EnterPRInput): string | null {
    const { exercise, weight, reps } = pr;
    if (!data[exercise]) {
      return `You currently don't have any recorded PRs for ${exercise}!`;
    }

    if (weight) {
      const result = data[exercise].weight[weight];
      return result
        ? `Your current PR for ${weight} is ${result} reps!`
        : `You currently don't have any recorded ${exercise} PRs for ${weight}`;
    }

    if (reps) {
      const result = data[exercise].reps[reps];
      return result
        ? `Your current PR for ${reps} reps is ${result}!`
        : `You currently don't have any recorded ${exercise} PRs for ${reps} reps`;
    }
    return null;
  }
}
