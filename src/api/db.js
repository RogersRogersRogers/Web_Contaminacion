import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

const pool = createPool({
  host: process.env.MYSQLDB_HOST || 'localhost',
  user: 'root',
  password: process.env.MYSQLDB_ROOT_PASSWORD || 'admin',
  database: process.env.MYSQLDB_DATABASE || 'faztdb',
  port: process.env.MYSQLDB_LOCAL_PORT || 3306
});

export { pool };  // Exportar pool
