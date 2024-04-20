// server.js
import express from "express";
import { env } from "./config/index.js";
import mongoose from "mongoose";
// importation de chokidar pour détecter les changements dans le fichier film.xlsx
import chokidar from "chokidar";
import cors from "cors";
import { synchronizeFilms } from "./controllers/film.js"
import cookieParser from "cookie-parser";
// router
import filmRouter from "./router/film.js";
import userRouter from "./router/user.js";
// app express
const app = express();
// port
const PORT = env.port || 8080;

// connexion à ma dbb cinetech
mongoose
    .connect(env.mongoURI, { dbName: "cinetech" })
    .then(() => console.log("connexion à la dbb cinetech mongoDB réussie !"))
    .catch(error => console.log(error));
// connexion à ma dbb userCinetech
mongoose
    .connect(env.mongoURI, { dbName: "userCinetech" })
    .then(() => console.log("connexion à la base de données userCinetech mongoDB réussie !"))
    .catch(error => console.log(error));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: PORT, credentials: true }));

// PREFIX ROUTES
app.use('/api/film', filmRouter);
app.use('/api/user', userRouter);

// utilisation de chokidar pour détecter les changements dans le fichier film.xlsx(à chaque nouvel enregistrement dans le fichier film.xlsx qu'il y aie un changement ou non on est informé)
const watcher = chokidar.watch("film.xlsx", { persistent: true });
watcher.on("change", async (path) => {
    console.log(`${path} has been changed`);
    // utilisation de la fonction synchronizeFilms présente dans mon controller pour synchroniser les films
    synchronizeFilms();
});

// server
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});