import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/stock-api")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});