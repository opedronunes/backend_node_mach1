const express = require("express");
const app = express();

const users = [
    {
        "id": 1,
        "nome": "Pedro"
    },
    {
        "id": 2,
        "nome": "Maria"
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

app.get("/movies", (req, res)=>{
    const getMovies = movies;
    res.send(getMovies);
});

app.get("/users", (req, res)=>{
    const getUser = users;
    res.send(getUser);
});

//Query Params
app.get("/users/:id", (req, res)=>{
    const currentUser = users.find((user) => user.id ==req.params.id);
    res.json(currentUser);
});

app.listen(8080, ()=>{
    console.log("SERVER RUN:8080")
})
