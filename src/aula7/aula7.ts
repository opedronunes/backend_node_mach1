//const express = require("express");
//const { v4: uuidv4 } = require("uuid");
//const bodyParser = require("body-parser");
//import { userModel } from "./types";
import bodyParser from "body-parser";
import express from "express";
import JWT from 'jsonwebtoken';
import { v4 as uuidv4 } from "uuid";
import { userModel } from "./types";

const app = express();

function AuthGuard (request:any, response:any, next:any) {
    const {headers} = request;
    const {authorization} = headers;
    try{
        const decoded: any = JWT.verify(authorization, secretKey);
        if (decoded.email === ADMIN.email && decoded.password === ADMIN.password) {
            next();
        }

    }catch(error){
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

const users: userModel[] = [
    {
        "id": uuidv4(),
        "email": "default@email.com",
        "password": "2345"
    }
]


const secretKey = "20304050";

app.use(bodyParser.json());

app.post("/login", (request, response) => {
    const {email, password} = request.body;
    if (email === ADMIN.email && password === ADMIN.password) {
        const token = JWT.sign({email, password}, secretKey, {
            expiresIn: "15m",
        });
        response.json({token});
       
    }
    response.status(401).send("usuario nao encontrado!")
});

app.post("/users", (req, res) => {
    // body - request.body {name, age}
    const {email, password} = req.body;
    const newUser = {
        id: uuidv4(),
        email, password
    };
    users.push(newUser);
    res.json(newUser);
});

app.get("/users", AuthGuard, (request, response) => {
    const AllUsers = users;
    response.json(AllUsers);
});

app.get("/products", AuthGuard, (req, res)=>{ 
    
    const getProducts = products;
    res.json(getProducts);
});

app.listen(8080, ()=>{
    console.log("SERVER RUN:8080")
})
