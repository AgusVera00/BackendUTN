import { Router } from "express";
import { createProduct, getProducts, getProductsByName, getProductsById } from "../controllers/productController.js";

const productRoute = Router();

productRoute.get("/get", getProducts)
productRoute.post("/create", createProduct)
productRoute.get("/get-by-name", getProductsByName)
productRoute.post("/get-by-id/:id", getProductsById)

export default productRoute