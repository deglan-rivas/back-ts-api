// usar pnpm add -DE typescript ts-standard
// crear script tsc: "tsc"
// crear el tsconfig.json usando ./node_modules/.bin/tsc --init o pnpm exec tsc ..init === npx tsc --init o npm run tsc -- --init pues solo instalamos tsc para node local y no con -g -> el -- solo indica que el --init no irá con el comando npm run sino con el compilado que es el "tsc" equivalente al npm run tsc xd
// habilitar mis opciones del tsconfig.json -> el ImplicitAny es jodido xd
// agregar los types de ts de tus paquetes como express pnpm add -DE @types/express
// _req para hacer el param req privado solo por ahora xd
// probar el pnpm tsc y el start para producción
// aplicar un poco de clean architecture con routes y services -> reemplazan a controller
// hay que habilitar el importJson en el ts.config
// type.d.ts está por defecto para guardar tus type alias
// agregar el eslintConfig en package.json ez -> crear script lint y correr nomás ez ahora sí si guardamos en un ts nos fixeará los errores y sino usar ctrl shift p, abrir settings o preferences workspace o user mejor user pues workspace solo funcará en este directorio raíz, agregar lo de este enlacehttps://www.digitalocean.com/community/tutorials/workflow-auto-eslinting

// ERRORES
// GET https://registry.npmjs.org/tsc-node-dev: Not Found - 404

// This error happened while installing a direct dependency of /home/deglan/Escritorio/practicas_random/back-ts-api

// tsc-node-dev is not in the npm registry, or you have no permission to fetch it. -> es ts-node-dev y no tsc-node-dev xd
// Error: Cannot find module 'index.ts' from '/home/deglan/Escritorio/practicas_random/back-ts-api' la ruta es src./index.ts y no solo index.ts
// no olvidar el express.use(express.json()) y el express.use(express.urlencoded({ extended: true })) o el chrome no renderizará el .send ni .json
// https://github.com/pnpm/pnpm/issues/6159 para usar pnpm exec en lugar de pnpx y npm run tsc -- --init -> https://stackoverflow.com/questions/36916989/how-can-i-generate-a-tsconfig-json-file
// al renderizar el getEntriesWithoutSensitiveInfo no veíamos cambios ni con ctrl r ni ctrl shift r, hicimos Omit id y tampoco, era por la ruta no home usa el getEntries xd, creamos una nueva probamos cambios y con ctrl r funcó xd
// el express.json() debe ir antes del app.use diaryRouter o siempre devolverá undefined tmr xd -> era undefined porque faltaba eso, pero sí estaba entonces no lo estaba leyendo porque estba antes -> https://stackoverflow.com/questions/69627305/undefined-body-from-post-request-in-nodejs

import express from 'express'
import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/diaries', diaryRouter)

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
