"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
//const { v4: uuidv4 } = require("uuid");
//const bodyParser = require("body-parser");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const users = [
    {
        "id": (0, uuid_1.v4)(),
        "name": "Pedro",
        "age": 21,
        "email": "pedro@email.com",
        "profile": [{
                "type": "type1",
                "credit": 10,
                "business": true
            }]
    },
    {
        "id": (0, uuid_1.v4)(),
        "name": "Manuela",
        "age": 4,
        "email": "manuela@email.com",
        "profile": [{
                "type": "type1",
                "credit": 4,
                "business": true
            }]
    },
];
app.use(body_parser_1.default.json());
//listar usuários
app.get("/users", (req, res) => {
    const getUser = users;
    res.json(getUser);
});
app.post("/users", (req, res) => {
    // body - request.body {name, age}
    const { name, age, email, profile } = req.body;
    const newUser = {
        id: (0, uuid_1.v4)(),
        name, age, email, profile
    };
    users.push(newUser);
    res.json(newUser);
});
app.get("/users/:id", (req, res) => {
    const currentUser = users.find((user) => user.id == req.params.id);
    if (currentUser) {
        res.json(currentUser);
    }
    else {
        res.send("Nenhum usuario encontrado!");
    }
});
app.listen(8080, () => {
    console.log("SERVER RUN:8080");
});
