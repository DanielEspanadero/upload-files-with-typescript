"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid = crypto_1.default.randomUUID();
// Defining storage of files
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "../../public/uploads"),
    filename: function (req, file, cb) {
        cb(null, uuid /* file.originalname */);
    },
});
// Filterting by mimetypes
const fileFilter = (req, file, cb) => {
    const fileTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (fileTypes.some((fileType) => fileType === file.mimetype)) {
        return cb(null, true);
    }
    return cb(null, false);
};
const maxSize = 5 * 1024 * 1024;
const upload = (req, res, next) => {
    return (0, multer_1.default)({
        storage,
        limits: { fileSize: maxSize },
        fileFilter,
    }).single("image")(req, res, (err) => {
        // File size error
        if (err instanceof multer_1.default.MulterError)
            return res.status(400).json("Max file size 5MB allowed!");
        // Invalid file type, message will return from fileFilter callback
        if (err)
            return res.status(400).json(err.message);
        // File not selected or incorrect format
        if (!req.file)
            return res.status(400).json({
                msg: "No file has been uploaded, remember that you can only upload .jpeg, .jpg, .png and .gif formats.",
            });
        // Success
        next();
    });
};
exports.upload = upload;
