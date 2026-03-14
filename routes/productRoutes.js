import express from "express";

import {getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js"

import {
  validateProductId,
  validateCreateProduct,
  validateUpdateProduct
} from "../middlewares/productValidations.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", validateProductId, getProductById);
router.post("/", validateCreateProduct,createProduct);
router.put("/:id", validateProductId, validateUpdateProduct, updateProduct);
router.delete("/:id", validateProductId, deleteProduct);

export default router;