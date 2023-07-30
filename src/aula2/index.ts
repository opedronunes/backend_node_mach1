
import * as readlineSync from 'readline-sync';

interface Pessoa {
  nome: string;
  email: string;
  idade: number;
  sexo: string;
}

function cadastrarPessoa(): Pessoa {
  const nome = readlineSync.question('Digite o nome da pessoa: ');
  const email = readlineSync.question('Digite o email da pessoa: ');
  const idade = Number(readlineSync.question('Digite a idade da pessoa: '));
  const sexo = readlineSync.question('Digite o sexo da pessoa: ');

  return { nome, email, idade, sexo };
}

function main(): void {
  const pessoas: Pessoa[] = [];

  console.log('Cadastro de pessoas\n');

  const quantidadePessoas = Number(readlineSync.question('Digite a quantidade de pessoas que deseja cadastrar: '));

  for (let i = 1; i <= quantidadePessoas; i++) {
    console.log(`\nCadastro da pessoa ${i}`);
    const pessoa = cadastrarPessoa();
    pessoas.push(pessoa);
  }

  console.log('\nLista de pessoas cadastradas:');
  pessoas.forEach((pessoa, index) => {
    console.log(`Posição ${index + 1}: ${pessoa.nome}`);
  });
}

main();