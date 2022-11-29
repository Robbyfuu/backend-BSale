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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connections_1 = __importDefault(require("../db/connections"));
const product_1 = __importDefault(require("../routes/product"));
const category_1 = __importDefault(require("../routes/category"));
const webplay_1 = __importDefault(require("../routes/webplay"));
class Server {
    constructor() {
        this.apiPaths = {
            product: '/api/product',
            category: '/api/category',
            webpay: '/webpay_plus'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        //metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    //Base de Datos
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connections_1.default.authenticate();
                console.log('base de datos online');
            }
            catch (error) {
                if (error) {
                    yield connections_1.default.authenticate();
                    console.log('base de datos online');
                }
                throw new Error(error);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
        //carpeta publicas
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.product, product_1.default);
        this.app.use(this.apiPaths.category, category_1.default);
        this.app.use(this.apiPaths.webpay, webplay_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map