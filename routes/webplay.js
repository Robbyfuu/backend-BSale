"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webpay_1 = require("../controllers/webpay");
const router = (0, express_1.Router)();
router.get('/', webpay_1.getToken);
router.get('/commit', webpay_1.commit);
router.post('/commit', webpay_1.commit);
exports.default = router;
//# sourceMappingURL=webplay.js.map