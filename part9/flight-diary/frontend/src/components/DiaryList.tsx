import { useEffect } from "react"
import { getAllDiaries } from "../services/diaries.ts"
import type { Diary } from "../types.ts"

interface DiaryItemProps {
  diary: Diary
}

interface DiaryListProps {
  diaries: Diary[]
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const DiaryItem = ({ diary }: DiaryItemProps) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  )
}

const DiaryList = ({ diaries, setDiaries }: DiaryListProps) => {
  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data))
  }, [])

  if (diaries.length < 1) return null
  return (
    <div>
      <h2>Diary entries</h2>
      <div>
        {diaries.map((diary) => (
          <DiaryItem key={diary.id} diary={diary} />
        ))}
      </div>
    </div>
  )
}

export default DiaryList
