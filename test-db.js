const sql = require('mssql');

const sqlConfig = {
  server: 'L123\\MSSQLSERVER0628', // Replace with your server name
  database: 'lost_and_found',      // Replace with your database name
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: {
    type: 'ntlm', // Use 'ntlm' for Windows Authentication
    options: {
      userName: '', // Leave empty for Windows Authentication
      password: '', // Leave empty for Windows Authentication
      domain: 'L123', // Replace with your machine's domain or computer name
    },
  },
};

async function testConnection() {
  try {
    const pool = await sql.connect(sqlConfig);
    console.log('Connected to the database!');
    const result = await pool.request().query('SELECT * FROM found_items');
    console.log(result.recordset);
    pool.close();
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

testConnection();
