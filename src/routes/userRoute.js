import express from "express";
import { create, get, deleteUser, updateUser } from "../controllers/userController.js";

const userRoute = express.Router()

userRoute.post("/create", create)
userRoute.get("/get", get)
userRoute.delete("/delete/:id", deleteUser)
userRoute.put("/update/:id", updateUser)

export default userRoute