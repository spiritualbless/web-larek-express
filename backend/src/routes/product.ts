import { createProduct, getProduct } from "../controllers/product";
import { Router } from "express";
import { productValidation } from "../middlewares/validators";

const router = Router();

router.get('/product', getProduct);
router.post('/product', productValidation, createProduct);

export default router