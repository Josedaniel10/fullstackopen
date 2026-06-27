import express from "express"
import { calculateBmi } from "./bmiCalculator"
import { calculateExercises } from "./exerciseCalculator"
import { isNotNumber } from "./utils"

const app = express()
const PORT = 3004

app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query

  if (!height || !weight) {
    res.json({ error: "malformatted parameters" })
    return
  }

  res.json({
    height,
    weight,
    bmi: calculateBmi(Number(height), Number(weight)),
  })
})

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body
  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }
  if (!Array.isArray(daily_exercises) || isNotNumber(target)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  const formatNumberExercises: number[] = daily_exercises.flatMap(
    (e: string) => (!isNotNumber(e) ? Number(e) : []),
  )

  res.json(calculateExercises(formatNumberExercises, Number(target)))
})

app.listen(PORT, () => {
  console.log("Listen server from http://localhost:" + PORT)
})
