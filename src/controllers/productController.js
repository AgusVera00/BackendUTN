import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find() .populate("category");
        if (products.length === 0) {
            return res.status(400).json({ message: "No products found" });
        }
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    };
};

export const createProduct = async (req, res) => {
    try {
        const productData = new Product(req.body);
        const {name} = productData;
        const productExists = await Product.findOne({name});
        if (productExists) {
            return res.status(400).json({ message: "Product already exists" });
        }
        const savedProduct = await productData.save();
        return res.status(201).json({ message: "Product created", data: savedProduct });
}
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const findProductByName = async (req, res) => {
    try {
    const name = req.body.name;
    const parsedName = name.trim().toLowerCase();
    const productExists = await Product.findOne({ name: parsedName });
    if (!productExists) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(productExists);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export const findProductById = async (req, res) => {
    try {
    const _id = req.params.id;
    const parsedId = id.trim().toLowerCase();
    const productExists = await Product.findOne({ _id: parsedId });
    if (!productExists) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(productExists);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

