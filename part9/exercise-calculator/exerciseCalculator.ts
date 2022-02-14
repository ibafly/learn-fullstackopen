interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHoursInPeriod: Array<number>,
  target: number
): Result => {
  if (
    // isNaN identifies a non-number
    isNaN(target) ||
    target < 0 ||
    !Array.isArray(exerciseHoursInPeriod) ||
    exerciseHoursInPeriod.some((hours) => isNaN(hours) || hours < 0)
  ) {
    throw new Error("malformatted parameters");
  }

  const periodLength = exerciseHoursInPeriod.length;
  const allExerciseHours = exerciseHoursInPeriod.reduce(
    (prev, el) => prev + el,
    0
  );
  const average = allExerciseHours / periodLength;
  const success = average > target;
  let rating;
  let ratingDescription;

  if (success) {
    rating = 3;
    ratingDescription = "good";
  } else if (average > target / 2) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  return {
    periodLength,
    trainingDays: exerciseHoursInPeriod.filter((hours) => hours !== 0).length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// const target = Number(process.argv[2]);
// const exerciseHoursInPeriod: Array<number> = process.argv
//   .slice(3)
//   .map((arg) => Number(arg));
// // console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
// console.log(calculateExercises(exerciseHoursInPeriod, target));

export default calculateExercises;
