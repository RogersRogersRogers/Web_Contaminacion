import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: 'root',
  password: process.env.DATABASE_ROOT_PASSWORD || 'admin',
  database: process.env.DATABASE_DATABASE || 'faztdb',
  port: process.env.DATABASE_LOCAL_PORT || 3306
});

export { pool };  // Exportar pool
