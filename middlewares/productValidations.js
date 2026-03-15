import mongoose from "mongoose";

export const validateProductId = (req, res, next) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "ID invalido"})
    }

    next();
};

export const validateCreateProduct = (req, res, next) => {
    const {name, stock, price} = req.body;

    if(!name || name.trim() === "") {
        return res.status(400).json({message : "El nombre es obligatorio"})
    }

    if (price === undefined) {
        return res.status(400).json({ message: "El precio es obligatorio"});
    }

    if (stock === undefined) {
        return res.status(400).json({ message: "El stock es obligatorio"});
    }

    if (typeof price !== "number") {
        return res.status(400).json({ message: "El precio debe ser un número"});
    }

    if (typeof stock !== "number") {
        return res.status(400).json({ message: "El stock debe ser un número"});
    }

    if (price < 0) {
        return res.status(400).json({ message: "El precio no puede ser negativo"});
    }

    if (stock < 0) {
        return res.status(400).json({ message: "El stock no puede ser negativo"});
    }

    next();
};

export const validateUpdateProduct = (req, res, next) => {
    const {name, stock, price, category} = req.body;

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({ message: "El nombre no puede estar vacío"});
        }
    }

    if (price !== undefined) {
        if (typeof price !== "number") {
            return res.status(400).json({ message: "El precio debe ser un número"});
        }

        if (price < 0) {
            return res.status(400).json({ message: "El precio no puede ser negativo"});
        }
    }

    if (stock !== undefined) {
        if (typeof stock !== "number") {
            return res.status(400).json({ message: "El stock debe ser un número"});
        }

        if (stock < 0) {
            return res.status(400).json({ message: "El stock no puede ser negativo"});
        }
    }

    if (category !== undefined && typeof category !== "string") {
        return res.status(400).json({ message: "La categoría debe ser un texto"});
    }

    next();
}