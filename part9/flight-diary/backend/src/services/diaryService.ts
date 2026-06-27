import diaries from '../../data/diaryData';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById
};