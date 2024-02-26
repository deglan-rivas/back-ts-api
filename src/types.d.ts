// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
// export type Visibility = 'great' | 'good' | 'ok' | 'poor'
import { Weather, Visibility } from './enums'

export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

// lo mejor es utilizar los utility types para crear la menor cantidad de interface posibles, lo mejor es reciclar y que ts infiera por sí solo -> eso indica que lo estás haciendo bien

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>
// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
