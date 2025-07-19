import { Pool } from 'pg';

/**
 * *TIP: Uncomment (and comment below pool) if .env does not work
 */
// const pool = new Pool({
//     user: 'postgres',
//     password: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     database: 'postgres'
// });

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME
});

export default pool;
