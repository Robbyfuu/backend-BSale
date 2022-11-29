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
Object.defineProperty(exports, "__esModule", { value: true });
exports.commit = exports.getToken = void 0;
const transbank_sdk_1 = require("transbank-sdk");
const getToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let buyOrder = "RBTRCEiugfiudbkjasd-" + Math.floor(Math.random() * 10000) + 1;
    let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
    let amount = Math.floor(Math.random() * 1000) + 1001;
    let returnUrl = req.protocol + "://" + 'localhost:3000' + "/webpay_plus/commit";
    console.log(returnUrl);
    const createResponse = yield (new transbank_sdk_1.WebpayPlus.Transaction()).create(buyOrder, sessionId, amount, returnUrl);
    let token = createResponse.token;
    let url = createResponse.url;
    console.log('getToken', token);
    res.json(createResponse);
});
exports.getToken = getToken;
const commit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let params = req.method === 'GET' ? req.query : req.body;
    console.log("================================================================================");
    console.log(req);
    console.log("================================================================================");
    let token = params.token_ws;
    let tbkToken = params.TBK_TOKEN;
    let tbkOrdenCompra = params.TBK_ORDEN_COMPRA;
    let tbkIdSesion = params.TBK_ID_SESION;
    console.log('params', token);
    console.log('tbk', tbkToken);
    let step = null;
    let stepDescription = null;
    let viewData = {
        token,
        tbkToken,
        tbkOrdenCompra,
        tbkIdSesion
    };
    if (token && !tbkToken) { //Flujo 1
        const commitResponse = yield (new transbank_sdk_1.WebpayPlus.Transaction()).commit(token).catch(e => { res.json(e); console.log(e); tbkToken = token; token = undefined; });
        viewData = {
            token,
            commitResponse,
        };
        step = "Confirmar Transacción";
        stepDescription = "En este paso tenemos que confirmar la transacción con el objetivo de avisar a " +
            "Transbank que hemos recibido la transacción ha sido recibida exitosamente. En caso de que " +
            "no se confirme la transacción, ésta será reversada.";
        // res.json({step,stepDescription,viewData})
        // return  
    }
    else if (!token && !tbkToken) { //Flujo 2
        step = "El pago fue anulado por tiempo de espera.";
        stepDescription = "En este paso luego de anulación por tiempo de espera (+10 minutos) no es necesario realizar la confirmación ";
    }
    else if (!token && tbkToken) { //Flujo 3
        step = "El pago fue anulado por el usuario.";
        stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    }
    else if (token && tbkToken) { //Flujo 4
        step = "El pago es inválido.";
        stepDescription = "En este paso luego de abandonar el formulario no es necesario realizar la confirmación ";
    }
    res.json({ step, stepDescription, viewData });
    console.log({ step, stepDescription, viewData });
    // res.render("webpay_plus/commit-error", {
    //   step,
    //   stepDescription,
    //   viewData,
    // });
});
exports.commit = commit;
//# sourceMappingURL=webpay.js.map