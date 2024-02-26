import express from 'express'
import { getEntries, getEntriesWithoutSensitiveInfo, findById, addEntry } from '../services/diaryService'
import parseDiaryEntry from '../utils/diaries'

const router = express.Router()

router.get('/', (_req, res) => {
  // res.json({mensaje: 'Fetching all diaries!'});
  // res.send('Fetching all diaries!')
  res.json(getEntries())
})

router.get('/:id', (req, res) => {
  const diary = findById(Number(req.params.id))
  return (diary !== undefined) ? res.json(diary) : res.sendStatus(404)
  // recordar que res.send solo renderiza texto o json pero no boolean ni number convertirlos con toLocaleString() ez
})
// Number o usar +.params.id ez
// solito autocompleta el nullish ?. comment pues puede ser undefined

router.get('/private', (_req, res) => {
  res.json(getEntriesWithoutSensitiveInfo())
})

// esta es la forma larga, mejor es la forma corta de abajo
// router.post('/', (req, res) => {
//   const newDiary = addEntry(req.body.date, req.body.weather, req.body.visibility, req.body.comment)
//   res.json(newDiary)
// })
// TODO lo que falta ahora es validar que se envíe en el formato correcto y no cualquier cosa como weather = '1' que es string,
// parsear cada prop enviada
// los enums son objetos sobre los cuáles se puede acceder a sus props con un Object.values y provee una lista en tiempo de compilación
// splitear los enums.ts de las definiciones .d.ts types e interfaces y quizás clases
// TODO estaría bueno primero ver los videos de largo anotan la estructura de los videos cada 3-5 puntos de mi cabeza en notion con lista ordenada y tabs para acotaciones, luego yo mismo copiar el código y explicar, y finalmente escribirlo yo solo ez xd
router.post('/', (req, res) => {
  // console.log(req.body)
  // const { date, weather, visibility, comment } = req.body
  // const newDiary = addEntry({
  //   date,
  //   weather,
  //   visibility,
  //   comment
  // })
  // res.json(newDiary)

  try {
    const unformatedDiary = parseDiaryEntry(req.body)
    const addedDiary = addEntry(unformatedDiary)
    res.json(addedDiary)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router
