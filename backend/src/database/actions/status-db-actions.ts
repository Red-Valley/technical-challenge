import db from '..';
import { v6 as uuidv6 } from 'uuid';

const create = async ({ name, parent_id, order_number }: { name: string; parent_id: string; order_number: string }) => {
    const query = `
        INSERT INTO
            statuses (id, name, parent_id, order_number)
        VALUES
            ($1, $2, $3, $4)
        RETURNING *
    ;`;

    const UUID = uuidv6();

    const result = await db.query(query, [UUID, name, parent_id, order_number]);

    return result.rows[0];
};

const findOneById = async (id: string) => {
    const query = `
        SELECT * FROM
            statuses
        WHERE
            id = $1
    ;`;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const findAll = async () => {
    const query = `
        SELECT * FROM
            statuses
    ;`;

    const result = await db.query(query);

    return result.rows;
};

const updateOneById = async ({ id, name }: { id: string; name: string }) => {
    const query = `
        UPDATE
            statuses
        SET
            name = $2
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [id, name]);

    return result.rows[0];
};

const deleteOneById = async (id: string) => {
    const query = `
        DELETE FROM
            statuses
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
