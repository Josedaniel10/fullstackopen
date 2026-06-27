import { isNotNumber } from "./utils";

interface BMIValues {
  height: number
  weight: number
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMt = height / 100;
  const imc = weight / (heightInMt * heightInMt);

  if (imc <= 18.5) {
    return "Underweight";
  } else if (imc <= 24.9) {
    return "Normal (healthy weight)";
  } else if (imc <= 29.9) {
    return "Weight above normal";
  } else {
    return "Obesity";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let message = "Something went wrong: ";
  if (error instanceof Error) {
    message += error.message;
  }
  console.log(message);
}
