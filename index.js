

import express from "express";
import songRouter from "./routes/song.js"
import { connectToDB } from "./db/connectToDb.js"

const app = express();
app.use(express.json());
connectToDB();

app.use("/api/songs", songRouter);


app.listen(3500, () => {
    console.log("app is listening on port 3500")
})