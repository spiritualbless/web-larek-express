import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import product from "../models/product";
import badRequestError from "../errors/bad-req-error";

interface IOrder {
    items: string[];
    total: number;
    payment: "card" | "online";
    email: string;
    phone: string;
    address: string;
}

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { items, total, payment, email, phone, address } = req.body as IOrder;

    if (!Array.isArray(items) || items.length === 0) {
        return next(new badRequestError("Список товаров не может быть пустым"));
    }

    const invalidId = items.find((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidId) {
        return next(
            new badRequestError("Передан некорректный идентификатор товара")
        );
    }

    try {
        const products = await product.find({ _id: { $in: items } });

        if (products.length !== items.length) {
            return next(
                new badRequestError("Один или несколько товаров не найдены")
            );
        }

        const notForSale = products.find((p: any) => p.price === null);
        if (notForSale) {
            return next(
                new badRequestError(
                    "Некоторые товары недоступны для покупки"
                )
            );
        }

        const calculatedTotal = products.reduce(
            (sum: number, p: any) => sum + (p.price || 0),
            0
        );

        if (calculatedTotal !== total) {
            return next(
                new badRequestError("Неверно указана общая сумма заказа")
            );
        }

        return res.status(201).send({
            data: {
                items,
                total: calculatedTotal,
                payment,
                email,
                phone,
                address,
            },
        });
    } catch (e) {
        return next(e);
    }
};



