const createTables = `
    CREATE TABLE IF NOT EXISTS providers (
        id UUID PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        created_at VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS statuses (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        parent_id UUID,
        order_number INT NOT NULL,
        FOREIGN KEY (parent_id) REFERENCES statuses(id)
    );

    CREATE TABLE IF NOT EXISTS patients (
        id UUID PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        providers_id UUID REFERENCES providers(id) NOT NULL,
        status_id UUID REFERENCES statuses(id) NOT NULL,
        created_at VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS status_history (
        id UUID PRIMARY KEY,
        patients_id UUID REFERENCES patients(id) NOT NULL,
        statuses_id UUID REFERENCES statuses(id) NOT NULL,
        changed_at VARCHAR(255) NOT NULL
    );
`;

export default createTables;
