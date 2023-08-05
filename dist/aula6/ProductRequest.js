"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
//validação de dados
exports.productSchema = joi_1.default.object({
    productName: joi_1.default.string().required(),
    productDescription: joi_1.default.string().required(),
    productCategory: joi_1.default.string().required(),
    productCost: joi_1.default.number().required(),
    productTags: joi_1.default.array().items(joi_1.default.string()),
    productRelated: joi_1.default.array().items(joi_1.default.number()),
});
