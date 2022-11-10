"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const router = (0, express_1.Router)();
router.get('/', product_1.getProducts);
router.get('/:id', product_1.getProduct);
router.get('/category/:id', product_1.getProductbyCategory);
exports.default = router;
//# sourceMappingURL=product.js.map