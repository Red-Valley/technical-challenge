import db from '..';
import { v6 as uuidv6 } from 'uuid';

const create = async ({
    full_name,
    specialty,
    created_at
}: {
    full_name: string;
    specialty: string;
    created_at: string;
}) => {
    const query = `
        INSERT INTO
            providers (id, full_name, specialty, created_at)
        VALUES
            ($1, $2, $3, $4)
        RETURNING *
    ;`;

    const UUID = uuidv6();

    const result = await db.query(query, [UUID, full_name, specialty, created_at]);

    return result.rows[0];
};

const findOneById = async (id: string) => {
    console.log('String incoming ID:', id);

    // const query = `
    //     SELECT * FROM
    //         "providers"
    //     WHERE
    //         id = $1
    // ;`;

    const query = `
        SELECT * FROM
            "providers"
    ;`;

    // const result = await db.query(query, [id]);
    const result = await db.query(query);

    return result.rows[0];
};

const findAll = async () => {
    const query = `
        SELECT * FROM
            todos
    ;`;

    const result = await db.query(query);

    return result.rows;
};

const updateOne = async ({ id, title, status }: { id: number; title: string; status: string }) => {
    const query = `
        UPDATE
            todos
        SET
            title = $2,
            status = $3
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [+id, title, status]);

    return result.rows[0];
};

const deleteOne = async ({ id }: { id: number }) => {
    const query = `
        DELETE FROM
            todos
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [+id]);

    return result.rows[0];
};

export default {
    create,
    findOneById
};
