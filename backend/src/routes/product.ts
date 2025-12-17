import { createProduct, getProduct } from "../controllers/product";
import { Router } from "express";

const router = Router();

router.get('/product', getProduct);
router.post('/product', createProduct);

export default router