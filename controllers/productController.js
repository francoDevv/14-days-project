import Product from "../models/Product.js"

export const getProducts = async (req, res) => {
    try {
        const {name, category, minStock, sort} = req.query;
        
        let filters = {};

        if (name) {
            filters.name = { $regex: name, $options: "i"};
        }

        if (category) {
            filters.category = category;
        }

        if (minStock !== undefined) {
            filters.stock = {$gte: Number(minStock)};
        }

        let query = Product.find(filters);

        if (sort === "price_asc") {
            query = query.sort({price: 1});
        }
        
        if (sort === "price_desc") {
            query = query.sort({price: -1});
        }

        if (sort === "name_asc") {
            query = query.sort({name: 1});
        }
        
        if (sort === "name_desc") {
            query = query.sort({name: -1});
        }

        const products = await query;
        res.json(products)
    } catch (error) {
        res.status(500).json({ message : "Error del servidor"});
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
        const { name, price, stock, category} = req.body;

        const newProduct = new Product({
            name: name.trim(),
            price,
            stock,
            category
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error del servidor"});
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, price, stock, category } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado"});
        }

        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;
        if (category !== undefined) product.category = category;

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