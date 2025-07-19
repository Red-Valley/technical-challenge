import { Pool } from 'pg';

/**
 * TODO: Implement .env
 */
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
});

export default pool;
