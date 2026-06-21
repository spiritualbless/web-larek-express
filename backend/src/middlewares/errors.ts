import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler = (err: AppError, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        next(err);
        return;
    };

    const statusCode = err.statusCode ?? 500;
    const message = statusCode === 500 ? 'An unexpected error occurred' : err.message;

    res.status(statusCode).json({message});
};