import db from '..';
import { v6 as uuidv6 } from 'uuid';

const create = async ({
    patients_id,
    statuses_id,
    changed_at
}: {
    patients_id: string;
    statuses_id: string;
    changed_at: string;
}) => {
    const query = `
        INSERT INTO
            status_history (id, patients_id, statuses_id, changed_at)
        VALUES
            ($1, $2, $3, $4)
        RETURNING *
    ;`;

    const UUID = uuidv6();

    const result = await db.query(query, [UUID, patients_id, statuses_id, changed_at]);

    return result.rows[0];
};

const findOneById = async (id: string) => {
    const query = `
        SELECT * FROM
            status_history
        WHERE
            id = $1
    ;`;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const findAll = async () => {
    const query = `
        SELECT * FROM
            status_history
    ;`;

    const result = await db.query(query);

    return result.rows;
};

const updateOneById = async ({
    id,
    patients_id,
    statuses_id,
    changed_at
}: {
    id: string;
    patients_id: string;
    statuses_id: string;
    changed_at: string;
}) => {
    const query = `
        UPDATE
            status_history
        SET
            patients_id = $2,
            statuses_id = $3,
            changed_at = $4
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [id, patients_id, statuses_id, changed_at]);

    return result.rows[0];
};

const deleteOneById = async (id: string) => {
    const query = `
        DELETE FROM
            status_history
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
