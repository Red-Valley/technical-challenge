import db from '..';
import { v6 as uuidv6 } from 'uuid';

const create = async ({
    full_name,
    email,
    phone,
    providers_id,
    status_id,
    created_at
}: {
    full_name: string;
    email: string;
    phone: string;
    providers_id: string;
    status_id: string;
    created_at: string;
}) => {
    const query = `
        INSERT INTO
            patients (id, full_name, email, phone, providers_id, status_id, created_at)
        VALUES
            ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    ;`;

    const UUID = uuidv6();

    const result = await db.query(query, [UUID, full_name, email, phone, providers_id, status_id, created_at]);

    return result.rows[0];
};

const findOneById = async (id: string) => {
    const query = `
        SELECT * FROM
            patients
        WHERE
            id = $1
    ;`;

    const result = await db.query(query, [id]);

    return result.rows[0];
};

const findAll = async () => {
    const query = `
        SELECT * FROM
            patients
    ;`;

    const result = await db.query(query);

    return result.rows;
};

const updateOneById = async ({
    id,
    full_name,
    email,
    phone,
    providers_id,
    status_id
}: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    providers_id: string;
    status_id: string;
}) => {
    const query = `
        UPDATE
            patients
        SET
            full_name = $2,
            email = $3,
            phone = $4,
            providers_id = $5,
            status_id = $6
        WHERE
            id = $1
        RETURNING *
    ;`;

    const result = await db.query(query, [id, full_name, email, phone, providers_id, status_id]);

    return result.rows[0];
};

const deleteOneById = async (id: string) => {
    const query = `
        DELETE FROM
            patients
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
