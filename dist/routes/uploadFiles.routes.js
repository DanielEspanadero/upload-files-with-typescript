"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadFiles_controller_1 = require("../controllers/uploadFiles.controller");
const uploadFiles_middleware_1 = require("../middlewares/uploadFiles.middleware");
const router = (0, express_1.Router)();
router.post("/", uploadFiles_middleware_1.upload, uploadFiles_controller_1.uploadPost);
exports.default = router;
