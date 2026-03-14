import Product from "../models/Product.js"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor"});
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado"});
        }   
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor"});
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, price, stock} = req.body;

        const newProduct = new Product({
            name: name.trim(),
            price,
            stock,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor"});
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado"});
        }

        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;

        const savedProduct = await product.save();

        res.json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor"});
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado"});
        }

        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error del servidor"});
    }
};