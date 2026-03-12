import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js"

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
.connect("mongodb://127.0.0.1:27017/stock-api")
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  try {

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID inválido"
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: "Error del servidor"
    });
  }
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct);
});

app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar producto"
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.json({
      message: "Producto eliminado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar producto"
    });
  }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    
})