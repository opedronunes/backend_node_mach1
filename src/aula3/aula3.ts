import * as readlineSync from 'readline-sync';

interface Cliente {
  cpf: string;
  nome: string;
  idade: number;
  estadoCivil: string;
  endereco: string;
  cidade: string;
  estado: string;
}

function validarCPF(cpf: string): boolean {
  const cpfFormat = /^\d{11}$/;

  if (!cpfFormat.test(cpf)) {
    return false;
  }

  return true;
}

function cadastrarCliente(): Cliente {
  const cpf = readlineSync.question('Digite o CPF do cliente (11 dígitos): ');
  if (!validarCPF(cpf)) {
    console.log('CPF inválido. Por favor, insira um CPF válido.');
    process.exit(1);
  }

  const nome = readlineSync.question('Digite o nome do cliente: ');
  const idade = Number(readlineSync.question('Digite a idade do cliente: '));
  const estadoCivil = readlineSync.question('Digite o estado civil do cliente: ');
  const endereco = readlineSync.question('Digite o endereço do cliente: ');
  const cidade = readlineSync.question('Digite a cidade do cliente: ');
  const estado = readlineSync.question('Digite o estado do cliente: ');

  return { cpf, nome, idade, estadoCivil, endereco, cidade, estado };
}

function main(): void {
  console.log('Cadastro de Clientes\n');

  const cliente = cadastrarCliente();

  console.log('\nDados do cliente cadastrado:');
  console.log('CPF:', cliente.cpf);
  console.log('Nome:', cliente.nome);
  console.log('Idade:', cliente.idade);
  console.log('Estado Civil:', cliente.estadoCivil);
  console.log('Endereço:', cliente.endereco);
  console.log('Cidade:', cliente.cidade);
  console.log('Estado:', cliente.estado);
}

main();