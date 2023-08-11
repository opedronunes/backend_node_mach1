"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class Database {
    constructor() {
        this.connection = mysql_1.default.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        });
        this.connection.connect((error) => {
            if (error) {
                console.error('Erro de conexão com o banco de dados!', error);
                throw error;
            }
            console.log('Conexão realizada com sucesso!');
        });
    }
    getConnection() {
        return this.connection;
    }
    closeConnection() {
        this.connection.end();
    }
}
exports.default = Database;
