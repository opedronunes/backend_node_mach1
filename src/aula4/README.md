### Aula 4
Agora é sua vez! Conforme o que vimos em aula, crie um projeto utilizando Node e Express, e seu servidor na rota raiz deve responder o seguinte objeto JSON:
```
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
```