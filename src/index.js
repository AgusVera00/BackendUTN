import express from "express";
import bodyParser from "body-parser";
import {PORT} from "./config.js";
import { connectDB } from "./db.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});