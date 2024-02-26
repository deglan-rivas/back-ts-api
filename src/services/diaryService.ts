import { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiaryEntry } from '../types'
import diaryData from './diaries.json'
// el orden en la cadena de importaciones es .tsx, .ts, .node, .js, .json -> aunque ES dice que usemos el .js, ts ni lo agrega xD de frente lee los .ts

// aquí utilizar la aserción de tipos siempre que sea externo como un fetch o navegador DOM html
// export const getEntries: () => Array<DiaryEntry> = () => diaryData as DiaryEntry[]
// export const getEntries = (): DiaryEntry[] => diaryData as DiaryEntry[]

let diaries = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

// esto no es conveniente pues si ya tenemos una interface en el tpyes.d.ts lo mejor es usar un utility type para omitir el id sobrante
// export const addEntry = (date: string, weather: Weather, visibility: Visibility, comment: string): DiaryEntry => {
//   const newDiary = {
//     id: diaries.length + 1,
//     date,
//     weather,
//     visibility,
//     comment
//   }

//   diaries = [...diaries, newDiary]
//   return newDiary
// }
export const addEntry = (newDiary: NewDiaryEntry): DiaryEntry => {
  const NewDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiary
  }

  diaries = [...diaries, NewDiaryEntry]
  return NewDiaryEntry
}

export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => diaries.map(({ id, date, weather, visibility }) => ({ id, date, weather, visibility }))

// notar que aunque usamos el omit para declarar nuevo tipo con utility types igual deja pasar el diaries de abajo pues ts funciona en estático y al compilar se pierde el tipado pipipipi pues js es dinámico xd
// export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => diaries

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
  const diary = diaries.find(diary => diary.id === id)
  if (diary !== undefined) {
    const { comment, ...restOfDiary } = diary
    return restOfDiary
  }

  return undefined
}
// el .find devuelve un undefined si no lo encuentra, ts nos salvó :'v
// el not all code paths return a values es porque usamos el returnExplicit en el tsconfig y debemos dejar un return en cada bifuración de la función
// hay que tener cuidado con los utility types, intentar probar con los types a ver si pasa lo mismo creando otra interface base para extenderla o unirla con el complemento, capaz los Partial ayudan a dar flexibilidad pues trabajo sobre una base hecha y no refactorizado con la esperanza de que mañana no cambie la estructura, pero hay que estar atento a las validaciones
