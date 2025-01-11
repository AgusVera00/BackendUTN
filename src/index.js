import express from "express";
import bodyParser from "body-parser";
import {PORT} from "./config.js";
import { connectDB } from "./db.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// http://localhost:3000/api/user
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});