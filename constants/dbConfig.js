const dbConfig = {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'password',
    database: process.env.DB || 'sartia',
};

const initialDbConfig = {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'password',
};

module.exports = {
    dbConfig,
    initialDbConfig,
};
