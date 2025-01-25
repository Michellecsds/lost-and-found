const sql = require('mssql');
require('dotenv').config();

const sqlConfig = {
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
      trustServerCertificate: true,
      encrypt: false,
    },
    authentication: {
      type: 'ntlm',
      options: {
        domain: process.env.DB_DOMAIN || '', // Optional domain if needed
        userName: process.env.DB_USER || '', // Keep empty for Windows Auth
        password: process.env.DB_PASSWORD || '', // Keep empty for Windows Auth
      },
    },
  };
  
const pool = new sql.ConnectionPool(sqlConfig);
const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
};

module.exports = { connectDB, sql };
