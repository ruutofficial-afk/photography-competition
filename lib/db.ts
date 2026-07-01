import mysql from 'mysql2/promise';

// Initialize a connection pool for MySQL.
// This is optimal for Next.js API routes as it manages connections dynamically.
export const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'photo_contest',
  port: Number(process.env.DATABASE_PORT || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
