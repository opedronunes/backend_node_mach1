"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
function validarCPF(cpf) {
    const cpfFormat = /^\d{11}$/;
    if (!cpfFormat.test(cpf)) {
        return false;
    }
    return true;
}
function cadastrarCliente() {
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
function main() {
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
