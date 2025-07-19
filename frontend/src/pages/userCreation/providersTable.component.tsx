import React, { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';

// Sample data
const sampleData = [
    {
        id: 1,
        full_name: 'Dr. John Doe',
        specialty: 'Cardiology',
        created_at: '2024-05-01T14:48:00.000Z'
    },
    {
        id: 2,
        full_name: 'Dr. Jane Smith',
        specialty: 'Neurology',
        created_at: '2024-04-15T09:20:00.000Z'
    },
    {
        id: 3,
        full_name: 'Dr. Alice Johnson',
        specialty: 'Pediatrics',
        created_at: '2024-03-30T17:35:00.000Z'
    }
];

const styles: { [key: string]: CSSProperties } = {
    container: {
        maxWidth: 700,
        margin: '2rem auto',
        padding: '1rem',
        fontFamily: 'Arial, sans-serif'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as 'collapse',
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
    noData: {
        padding: '1rem',
        textAlign: 'center',
        color: '#888'
    }
};

type DataRow = {
    id: number;
    full_name: string;
    specialty: string;
    created_at: string;
};

type Props = {
    data?: DataRow[];
};

const ProvidersTable: React.FC<Props> = () => {
    const [data, setData] = useState<DataRow[]>(sampleData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual API endpoint returning the data array
                const response = await axios.get<DataRow[]>('http://localhost:3000/api/provider/findAll');
                setData(response.data);
            } catch (err: any) {
                setError(err.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={styles.container}>
            <h2>Providers Table</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Full Name</th>
                        <th style={styles.th}>Specialty</th>
                        <th style={styles.th}>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={styles.noData}>
                                No data available.
                            </td>
                        </tr>
                    ) : (
                        data.map(({ id, full_name, specialty, created_at }) => (
                            <tr key={id}>
                                <td style={styles.td}>{id}</td>
                                <td style={styles.td}>{full_name}</td>
                                <td style={styles.td}>{specialty}</td>
                                <td style={styles.td}>{created_at}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProvidersTable;
