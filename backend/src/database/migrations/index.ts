import db from '..';
import createTables from './1_create-initial-tables';
import createStatuses from './2_create-statuses';
import createAProvider from './3_create-a-provider';

const runDbMigrations = async () => {
    console.log('BEGIN DB MIGRATION');
    const client = await db.connect();

    try {
        await client.query('BEGIN'); // begin transaction

        await client.query(createTables);

        /**
         * !IMPORTANT if you want to modify code and reload automatically comment the lines (17, 18) below.
         */
        await client.query(createStatuses);
        await client.query(createAProvider);

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
