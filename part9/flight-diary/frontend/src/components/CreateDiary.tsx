import { createDiary } from "../services/diaries"
import { useState } from "react"
import type { Diary } from "../types"
import Alert from "./Alert"

interface CreateDiaryProps {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const CreateDiary = ({ setDiaries }: CreateDiaryProps) => {
  const [date, setDate] = useState("")
  const [visibility, setVisibility] = useState("")
  const [weather, setWeather] = useState("")
  const [comment, setComment] = useState("")

  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState("")

  const visibilityOptions = ["great", "good", "ok", "poor"]
  const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"]

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const diaryToAdd = {
      date,
      visibility,
      weather,
      comment,
    }
    try {
      const newDiary = await createDiary(diaryToAdd)
      setDiaries((diaries) => diaries.concat(newDiary as Diary))
    } catch (error) {
      if (error instanceof Error) {
        setIsOpenAlert(true)
        setMessageAlert(error.message)
        setTimeout(() => {
          setIsOpenAlert(false)
          setMessageAlert("")
        }, 3000)
      }
    }

    setDate("")
    setVisibility("")
    setWeather("")
    setComment("")
  }

  return (
    <div>
      <h2>Add new diary</h2>
      <Alert isOpen={isOpenAlert} message={messageAlert} />
      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          visibility:
          <div>
            {visibilityOptions.map((option) => (
              <label key={option} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="visibility"
                  value={option}
                  checked={visibility === option}
                  onChange={(event) => setVisibility(event.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          weather:
          <div>
            {weatherOptions.map((option) => (
              <label key={option} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name="weather"
                  value={option}
                  checked={weather === option}
                  onChange={(event) => setWeather(event.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}
export default CreateDiary
