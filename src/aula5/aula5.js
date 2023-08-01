const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();

const users = [
    {
        "id": uuidv4(),
        "nome": "Pedro",
        "idade": 21
    },
    {
        "id": uuidv4(),
        "nome": "Maria",
        "idade": 30
    },
];

const movies = [
    {
        "id": 1,
        "titulo": "JSON x XML",
        "resumo": "o duelo de dois modelos de representação de informações",
        "ano": 2012,
        "genero": ["aventura", "ação", "ficção"]
    },
    {
        "id": 2,
        "titulo": "JSON James",
        "resumo": "a história de uma lenda do velho oeste",
        "ano": 2012,
        "genero": ["western"]
    }
];

app.use(bodyParser.json());

//listar usuários
app.get("/users", (req, res)=>{ 
    const getUser = users;
    res.json(getUser);
});

app.post("/users", (req, res) => {
    // body - request.body {name, age}
    const newUser = {
        ...req.body,
        id: uuidv4()
    };
    users.push(newUser);
    res.json(newUser);
});

app.listen(8080, ()=>{
    console.log("SERVER RUN:8080")
})
