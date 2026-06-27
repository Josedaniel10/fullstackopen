import { useState } from 'react'
import type { Diary } from './types'
import DiaryList from './components/DiaryList'
import CreateDiary from './components/CreateDiary'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])
  return (
    <>
      <CreateDiary setDiaries={setDiaries} />
      <DiaryList diaries={diaries} setDiaries={setDiaries} />
    </>
  )
}

export default App
