import mysql from 'mysql2/promise';

class Database {
  private connection: mysql.Connection | null = null;

  constructor() {
    this.initializeConnection();
  }

  private async initializeConnection() {
    try {
      this.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Pedro@2022',
        database: 'agendamento'
      });

      console.log('Conexão realizada com sucesso!');
    } catch (error) {
      console.error('Erro de conexão com o banco de dados!', error);
      throw error;
    }
  }

  public getConnection(): mysql.Connection {
    if (!this.connection) {
      throw new Error('Conexão não inicializada corretamente');
    }
    return this.connection;
  }

  public async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
    }
  }
}

export default new Database();