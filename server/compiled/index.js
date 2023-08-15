"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const index_1 = require("./routes/index");
const cloudinary_1 = require("cloudinary");
const errorHandler_1 = require("./errorMiddleware/errorHandler");
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
exports.app = app;
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(index_1.router);
app.use(errorHandler_1.errorHandler);
cloudinary_1.v2.config({
    cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'ddm6kawa9',
    api_key: process.env.CLOUDINARY_API_KEY || '173743349211811',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'HuwrAiQ_RXtZ9xOgajZz0XnpoFs',
});
function handleUpload(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield cloudinary_1.v2.uploader.upload(file, {
            folder: 'properties',
            resource_type: 'auto',
        });
        return res;
    });
}
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
app.post('/upload', upload.single('my_file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('got here');
    try {
        if (!req.file) {
            throw new Error('No file uploaded.');
        }
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        const cldRes = yield handleUpload(dataURI);
        console.log(cldRes);
        res.json(cldRes);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            message: error.message,
        });
    }
}));
app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`);
});
