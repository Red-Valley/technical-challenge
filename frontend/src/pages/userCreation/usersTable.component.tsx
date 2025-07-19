import React, { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';

// Sample data array (usually fetched from API or passed via props)
const sampleData = [
    {
        id: 1,
        full_name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        providers_id: 'P100',
        status_id: 'Active',
        created_at: '2024-05-01T14:48:00.000Z'
    },
    {
        id: 2,
        full_name: 'Jane Smith',
        email: 'janesmith@example.com',
        phone: '0987654321',
        providers_id: 'P101',
        status_id: 'Inactive',
        created_at: '2024-04-15T09:20:00.000Z'
    },
    {
        id: 3,
        full_name: 'Alice Johnson',
        email: 'alicej@example.com',
        phone: '5551234567',
        providers_id: 'P102',
        status_id: 'Active',
        created_at: '2024-03-30T17:35:00.000Z'
    }
];

const styles: { [key: string]: CSSProperties } = {
    container: {
        maxWidth: '900px',
        margin: '2rem auto',
        padding: '1rem',
        fontFamily: 'Arial, sans-serif'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)'
    },
    th: {
        padding: '0.75rem',
        borderBottom: '2px solid #ddd',
        textAlign: 'left',
        backgroundColor: '#f2f2f2'
    },
    td: {
        padding: '0.75rem',
        borderBottom: '1px solid #ddd'
    },
    tr: {
        // Optional: hover effect
        // cursor: 'pointer',
    },
    noData: {
        padding: '1rem',
        textAlign: 'center',
        color: '#888'
    },
    button: {
        padding: '0.75rem',
        fontWeight: 'bold',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

type DataRow = {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    providers_id: string;
    status_id: string;
    created_at: string;
};

type Props = {
    data?: DataRow[];
};

const UsersTable: React.FC<Props> = () => {
    const [data, setData] = useState<DataRow[]>(sampleData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get<DataRow[]>('http://localhost:3000/api/patient/findAll');
            setData(response.data);
        } catch (err: any) {
            setError(err.message || 'Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={styles.container}>
            <h2>User Information Table</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Full Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Phone</th>
                        <th style={styles.th}>Provider ID</th>
                        <th style={styles.th}>Status ID</th>
                        <th style={styles.th}>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={styles.noData}>
                                No data available.
                            </td>
                        </tr>
                    ) : (
                        data.map(({ id, full_name, email, phone, providers_id, status_id, created_at }) => (
                            <tr key={id} style={styles.tr}>
                                <td style={styles.td}>{id}</td>
                                <td style={styles.td}>{full_name}</td>
                                <td style={styles.td}>{email}</td>
                                <td style={styles.td}>{phone}</td>
                                <td style={styles.td}>{providers_id}</td>
                                <td style={styles.td}>{status_id}</td>
                                <td style={styles.td}>{created_at}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <button type='submit' style={styles.button} onClick={() => fetchData()}>
                Update registered patients
            </button>
        </div>
    );
};

export default UsersTable;
