import app from './src/app';
import runDbMigrations from './src/database/migrations';

async function start() {
    await runDbMigrations();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

start();
