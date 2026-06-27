type ThreeNumbers = 1 | 2 | 3;

import { isNotNumber } from "./utils";

interface CalcExerciseValues {
  hExercises: number[]
  target: number
}

interface InfoExercises {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const ratingDescriptionObj = {
  1: "A setback is just the beginning; get up and keep racking up the minutes.",
  2: "ou were so close! With a little more effort, you'll achieve it.",
  3: "Goal accomplished! You demonstrated the discipline needed to reach your objective!",
};

const parseArguments = (args: string[]): CalcExerciseValues => {
  const exercisesArr = args
    .slice(3)
    .flatMap((arg) => (!isNotNumber(arg) ? Number(arg) : []));
  if(!isNotNumber(args[2])) {
    return {
      hExercises: exercisesArr,
      target: Number(args[2])
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  hExercises: number[],
  target: number,
): InfoExercises => {
  const average = hExercises.reduce((a, b) => (a += b), 0) / hExercises.length;
  const trainingDays =
    hExercises.length - hExercises.filter((h) => h === 0).length;
  const percent = (average / target) * 100;
  let rating: ThreeNumbers | null = null;
  if (percent <= 49.9) rating = 1;
  else if (percent <= 99.9) rating = 2;
  else rating = 3;

  return {
    periodLength: hExercises.length,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: ratingDescriptionObj[rating],
    target,
    average,
  };
};

try {
  const { hExercises, target } = parseArguments(process.argv);
  console.log(calculateExercises(hExercises, target));
} catch (error: unknown) {
  let message = "Something went wrong: ";
  if (error instanceof Error) {
    message += error.message;
  }
  console.log(message);
}
