const mysql = require('mysql2/promise');

const { dbConfig, initialDbConfig } = require('../constants/dbConfig');

async function seedDatabase() {
    try {
        const initialConnection = mysql.createConnection(initialDbConfig);
        const createDBQuery = `CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`;
        (await initialConnection).query(createDBQuery);
        (await initialConnection).end();

        const pool = await mysql.createPool(dbConfig);

        const connection = await pool.getConnection();

        const createUserTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                profile TEXT,
                token VARCHAR(255),
                expiryToken VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `;

        await connection.query(createUserTableQuery);
        connection.release();
        console.info('database and table seeded!!!');
        return pool;
    } catch (error) {
        console.error('Error in seeding the db', error);
        throw error;
    }
}

module.exports = seedDatabase;
