"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("../config"));
const uploadFiles_routes_1 = __importDefault(require("../routes/uploadFiles.routes"));
class Server {
    constructor() {
        this.path = {
            upload: "/upload",
        };
        this.app = (0, express_1.default)();
        this.port = config_1.default.port;
        this.middlewares();
        this.routes();
        this.listen();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204,
        }));
    }
    routes() {
        this.app.use(this.path.upload, uploadFiles_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listenning on port ${this.port}`);
        });
    }
}
exports.default = Server;
