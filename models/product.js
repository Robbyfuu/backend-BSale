"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connections_1 = __importDefault(require("../db/connections"));
const Product = connections_1.default.define('Product', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    url_image: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER
    },
    discount: {
        type: sequelize_1.DataTypes.INTEGER
    },
    category: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'category',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'product'
});
exports.default = Product;
//# sourceMappingURL=product.js.map