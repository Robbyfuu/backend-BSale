"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const router = (0, express_1.Router)();
router.get('/', product_1.getProducts);
router.get('/:id', product_1.getProduct);
router.post('/', product_1.postProduct);
router.put('/:id', product_1.putProduct);
router.delete('/:id', product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=usuarios.js.map