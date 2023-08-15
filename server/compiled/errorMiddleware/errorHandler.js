"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(error, req, res, next) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
}
exports.errorHandler = errorHandler;
