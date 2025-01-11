import { Router } from "express";
import { createCategory, deleteCategory, getCategory } from "../controllers/categoryController.js";

const categoryRoute = Router();

categoryRoute.post("/create", createCategory)
categoryRoute.get("/get", getCategory)
categoryRoute.delete("/delete/:id", deleteCategory)

export default categoryRoute