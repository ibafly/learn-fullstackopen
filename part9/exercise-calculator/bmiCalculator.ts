const height: number = Number(process.argv[2]) // yarn add -D @types/node to avoid complain about the `process` variable
const weight: number = Number(process.argv[3])

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2)

  if (bmi < 18.5) {
    return "Underweight"
  } else if (bmi < 25) {
    return "Normal (healthy weight)"
  } else if (bmi < 30) {
    return "Overweight"
  } else {
    return "Obese"
  }
}

// console.log(calculateBmi(180, 74))
console.log(calculateBmi(height, weight))

export default calculateBmi
