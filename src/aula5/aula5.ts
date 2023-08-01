//const express = require("express");
//const { v4: uuidv4 } = require("uuid");
//const bodyParser = require("body-parser");
import bodyParser from "body-parser";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { userModel } from "./types";

const app = express();

const users: userModel[] = [
    {
        "id": uuidv4(),
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
        "id": uuidv4(),
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

app.use(bodyParser.json());

//listar usuários
app.get("/users", (req, res)=>{ 
    
    const getUser = users;
    res.json(getUser);
});

app.post("/users", (req, res) => {
    // body - request.body {name, age}
    const {name, age, email, profile} = req.body;
    const newUser = {
        id: uuidv4(),
        name, age, email, profile
    };
    users.push(newUser);
    res.json(newUser);
});

app.get("/users/:id", (req, res)=>{
    const currentUser = users.find((user) => user.id ==req.params.id);
    if(currentUser){
        res.json(currentUser);
    }else{
        res.send("Nenhum usuario encontrado!")
    }
});

app.listen(8080, ()=>{
    console.log("SERVER RUN:8080")
})