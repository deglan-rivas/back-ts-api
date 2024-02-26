"use strict";
// usar pnpm add -DE typescript
// crear script tsc: "tsc"
// crear el tsconfig.json usando ./node_modules/.bin/tsc --init o pnpm exec tsc ..init === npx tsc --init o npm run tsc -- --init pues solo instalamos tsc para node local y no con -g -> el -- solo indica que el --init no irá con el comando npm run sino con el compilado que es el "tsc" equivalente al npm run tsc xd
// habilitar mis opciones del tsconfig.json -> el ImplicitAny es jodido xd
// agregar los types de ts de tus paquetes como express pnpm add -DE @types/express
// _req para hacer el param req privado solo por ahora xd
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ERRORES
// GET https://registry.npmjs.org/tsc-node-dev: Not Found - 404
// This error happened while installing a direct dependency of /home/deglan/Escritorio/practicas_random/back-ts-api
// tsc-node-dev is not in the npm registry, or you have no permission to fetch it. -> es ts-node-dev y no tsc-node-dev xd
// Error: Cannot find module 'index.ts' from '/home/deglan/Escritorio/practicas_random/back-ts-api' la ruta es src./index.ts y no solo index.ts
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
