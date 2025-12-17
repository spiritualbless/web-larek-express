import path from "path";
import winston from "winston";
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '../logs', 'request.log')}),
    ],
    format: winston.format.json(),
    msg: 'HTTP {{req.method}} {{req.url}}'
});

export const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '../logs', 'error.log')}),
    ],
    format: winston.format.json(),
    msg: 'ERROR {{err.message}}'
});