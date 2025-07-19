import db from '..';
import createTables from './1_create-patient-table';

const runDbMigrations = async () => {
    console.log('BEGIN DB MIGRATION');
    const client = await db.connect();

    try {
        await client.query('BEGIN'); // begin transaction

        await client.query(createTables);

        await client.query('COMMIT'); // commit transaction

        console.log('END DB MIGRATION');
    } catch (e) {
        await client.query('ROLLBACK'); // rollback transaction

        console.log('DB migration failed');

        throw e;
    } finally {
        client.release();
    }
};

export default runDbMigrations;
