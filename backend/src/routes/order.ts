import { Router } from "express";
import { createOrder } from "../controllers/order";
import { orderValidator } from "../middlewares/validators";

const router = Router();

router.post("/order", orderValidator, createOrder);

export default router;