import api from "./axios"
import axios from "axios"
import type { Diary, NewDiary } from "../types"

export const getAllDiaries = async () => {
  const diaries = await api.get<Diary[]>("/diaries")
  return diaries.data
}

export const createDiary = async (diary: NewDiary) => {
  try {
    const newDiary = await api.post<Diary>("/diaries", diary)
    return newDiary.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data, { cause: error })
    }
  }
}
