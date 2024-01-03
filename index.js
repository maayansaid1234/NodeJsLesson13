//require -נקרא commonJS modules\
//import es6 modules

import express from "express";
import courseRouter from "./routes/course.js"
import { connectToDB } from "./db/connectToDb.js"

const app = express();
app.use(express.json());
connectToDB();

app.use("/api/course", courseRouter);


app.listen(3500, () => {
    console.log("app is listening on port 3500")
})