const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'medaithon57',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function initializeMySqlSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS callback_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      mobile VARCHAR(20) NOT NULL,
      otp VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      uhid VARCHAR(50) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS patient_followups (
      id INT AUTO_INCREMENT PRIMARY KEY,
      uhid VARCHAR(50) NOT NULL,
      diagnosis TEXT NOT NULL,
      severity VARCHAR(50) NOT NULL,
      next_follow_up VARCHAR(120) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

module.exports = {
  pool,
  initializeMySqlSchema,
};
