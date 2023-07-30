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
function cadastrarPessoa() {
    const nome = readlineSync.question('Digite o nome da pessoa: ');
    const email = readlineSync.question('Digite o email da pessoa: ');
    const idade = Number(readlineSync.question('Digite a idade da pessoa: '));
    const sexo = readlineSync.question('Digite o sexo da pessoa: ');
    return { nome, email, idade, sexo };
}
function main() {
    const pessoas = [];
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
