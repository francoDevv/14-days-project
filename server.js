import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});