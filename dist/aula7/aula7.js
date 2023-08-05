"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
//const { v4: uuidv4 } = require("uuid");
//const bodyParser = require("body-parser");
//import { userModel } from "./types";
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
function AuthGuard(request, response, next) {
    const { headers } = request;
    const { authorization } = headers;
    try {
        const decoded = jsonwebtoken_1.default.verify(authorization, secretKey);
        if (decoded.email === ADMIN.email && decoded.password === ADMIN.password) {
            next();
        }
    }
    catch (error) {
        response.status(402).send("Usuaro não autorizado!");
    }
}
const ADMIN = {
    email: 'admin@gmail.com',
    password: '1234'
};
const products = [
    "notebook",
    "tablet"
];
const users = [
    {
        "id": (0, uuid_1.v4)(),
        "email": "default@email.com",
        "password": "2345"
    }
];
const secretKey = "20304050";
app.use(body_parser_1.default.json());
app.post("/login", (request, response) => {
    const { email, password } = request.body;
    if (email === ADMIN.email && password === ADMIN.password) {
        const token = jsonwebtoken_1.default.sign({ email, password }, secretKey, {
            expiresIn: "15m",
        });
        response.json({ token });
    }
    response.status(401).send("usuario nao encontrado!");
});
app.post("/users", (req, res) => {
    // body - request.body {name, age}
    const { email, password } = req.body;
    const newUser = {
        id: (0, uuid_1.v4)(),
        email, password
    };
    users.push(newUser);
    res.json(newUser);
});
app.get("/users", AuthGuard, (request, response) => {
    const AllUsers = users;
    response.json(AllUsers);
});
app.get("/products", AuthGuard, (req, res) => {
    const getProducts = products;
    res.json(getProducts);
});
app.listen(8080, () => {
    console.log("SERVER RUN:8080");
});
