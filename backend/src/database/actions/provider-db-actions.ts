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
    const query = `
        SELECT * FROM
            providers
        WHERE
            id = $1
    ;`;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const findAll = async () => {
    const query = `
        SELECT * FROM
            providers
    ;`;

    const result = await db.query(query);

    return result.rows;
};

const updateOneById = async ({ id, full_name, specialty }: { id: string; full_name: string; specialty: string }) => {
    const query = `
        UPDATE
            providers
        SET
            full_name = $2,
            specialty = $3
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [id, full_name, specialty]);

    return result.rows[0];
};

const deleteOneById = async (id: string) => {
    const query = `
        DELETE FROM
            providers
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

export default {
    create,
    findOneById,
    findAll,
    updateOneById,
    deleteOneById
};
