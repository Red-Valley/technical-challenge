const createTables = `
    CREATE TABLE IF NOT EXISTS "providers" (
        id UUID PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        created_at VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "statuses" (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        parent_id UUID,
        order_number INT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "patients" (
        id UUID PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        FOREIGN KEY (id) REFERENCES providers(id),
        FOREIGN KEY (id) REFERENCES statuses(id),
        created_at VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "status_history" (
        id UUID PRIMARY KEY,
        FOREIGN KEY (id) REFERENCES patients(id),
        FOREIGN KEY (id) REFERENCES statuses(id),
        changed_at VARCHAR(255) NOT NULL
    );
`;

export default createTables;
