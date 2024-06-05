const mysql = require('mysql2/promise');
const { dbConfig } = require('../constants/dbConfig');

const db = mysql.createPool(dbConfig);

module.exports = db;
