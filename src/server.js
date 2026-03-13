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
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor"
    });
  }
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
  try {
    const { name, price, stock } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "El nombre es obligatorio"
      });
    }

    if (price === undefined) {
      return res.status(400).json({
        message: "El precio es obligatorio"
      });
    }

    if (stock === undefined) {
      return res.status(400).json({
        message: "El stock es obligatorio"
      });
    }

    if (price < 0) {
      return res.status(400).json({
        message: "El precio no puede ser negativo"
      });
    }

    if (stock < 0) {
      return res.status(400).json({
        message: "El stock no puede ser negativo"
      });
    }

    if (typeof price !== "number") {
        return res.status(400).json({
            message: "El precio debe ser un número"
        });
        }

if (typeof stock !== "number") {
        return res.status(400).json({
            message: "El stock debe ser un número"
        });
        }

    const newProduct = new Product({
      name: name.trim(),
      price,
      stock,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor"
    });
  }
});

app.put("/products/:id", async (req, res) => {
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

    const { name, price, stock } = req.body;

    if (name !== undefined) {
      if (name.trim() === "") {
        return res.status(400).json({
          message: "El nombre no puede estar vacío"
        });
      }
      product.name = name.trim();
    }

    if (price !== undefined) {
      if (typeof price !== "number") {
        return res.status(400).json({
          message: "El precio debe ser un número"
        });
      }

      if (price < 0) {
        return res.status(400).json({
          message: "El precio no puede ser negativo"
        });
      }

      product.price = price;
    }

    if (stock !== undefined) {
      if (typeof stock !== "number") {
        return res.status(400).json({
          message: "El stock debe ser un número"
        });
      }

      if (stock < 0) {
        return res.status(400).json({
          message: "El stock no puede ser negativo"
        });
      }

      product.stock = stock;
    }

    const savedProduct = await product.save();

    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor"
    });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID inválido"
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

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
      message: "Error del servidor"
    });
  }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    
})