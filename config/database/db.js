import mysql from 'mysql';
import 'dotenv/config';

const { HOST_DB, DATABASE_NAME, USERNAME_DB, PASSWORD_DB } = process.env;

const connection = mysql.createConnection({
    host: HOST_DB,
    database: DATABASE_NAME,
    user: USERNAME_DB,
    password: PASSWORD_DB,
});

connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});


export default connection;