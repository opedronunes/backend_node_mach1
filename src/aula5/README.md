## Aula 5

Para aceitar o body da requisição é necessário adicionar a lib abaixo:
- npm install body-parser

Para inserir um ID único atrvés do servidor para garantir a sua exclusividade:
- npm i uuid

Instalar os Types do TS.
- npm i @types/express
- npm i @types/uuid

Vamos praticar! Agora vamos criar uma API utilizando um arquivo .JSON para armazenar os dados.


a) Crie uma API para efetuar cadastro e obtenção de uma lista de clientes. Utilizando POST você deverá construir uma rota para  receber uma requisição contendo o body da figura;

b) Você deverá gravar esses dados recebidos no body, e, além disso, deve incluir para cada cliente cadastrado um ID exclusivo; 


c) Construa uma rota utilizando GET para retornar a lista de clientes que foram cadastrados, e caso não exista nenhum devolva uma resposta coerente ao seu “consumidor” da API;

Dicas importantes:

- Valide os dados recebidos, não grave qualquer coisa no arquivo.

- Utilize a tipagem forte do typescript como aliada para o desenvolvimento.

- Pesquise e questione o que for necessário enquanto estiver desenvolvendo o exercício. 

- Se possível, comente as ideias de solução com os colegas da turma. 

Obs.: Não deixe de encaminhar os arquivos e publicar seu código em seu repositório no git.