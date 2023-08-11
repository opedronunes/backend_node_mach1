import mysql from 'mysql';

class Database
{
  private connection: mysql.Connection;

  constructor(){
    this.connection = mysql.createConnection({
      host     : process.env.MYSQL_HOST,
      user     : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : process.env.MYSQL_DB
    });

    this.connection.connect((error) => {
      if (error) {
        console.error('Erro de conexão com o banco de dados!', error);
        throw error;
      }
      console.log('Conexão realizada com sucesso!');
    });
  }

  public getConnection(): mysql.Connection {
    return this.connection;
  }

  public closeConnection(): void {
    this.connection.end();
  }
}

export default Database;