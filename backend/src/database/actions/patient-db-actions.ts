import db from '..';
import { v6 as uuidv6 } from 'uuid';

const create = async ({
    full_name,
    email,
    phone,
    created_at
}: {
    full_name: string;
    email: string;
    phone: string;
    created_at: string;
}) => {
    const query = `
        INSERT INTO
            patients (id, full_name, email, phone, created_at)
        VALUES
            ($1, $2, $3, $4, $5)
        RETURNING *
    ;`;

    const UUID = uuidv6();

    const result = await db.query(query, [UUID, full_name, email, phone, created_at]);

    return result.rows[0];
};

export default {
    create
};
