import { Error } from "mongoose";

class notFoundError extends Error {
    public statusCode: number;

    constructor() {
        super('Page not found');
        this.statusCode = 404;
    }
}

export default notFoundError;