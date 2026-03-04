export class HttpError extends Error {
    statusCode: number;
    
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

export class ValidationError extends HttpError {
    constructor(message: string) {
        super(400, message);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string = "Resource not found") {
        super(404, message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = "Unauthorized") {
        super(401, message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = "Forbidden") {
        super(403, message);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
