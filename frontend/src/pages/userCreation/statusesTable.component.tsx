import React, { CSSProperties, useEffect, useState } from 'react';
import axios from 'axios';

// Sample data array
const sampleData = [
    { id: 1, name: 'Electronics', parent_id: null, order_number: 1 },
    { id: 2, name: 'Computers', parent_id: 1, order_number: 2 },
    { id: 3, name: 'Laptops', parent_id: 2, order_number: 3 },
    { id: 4, name: 'Smartphones', parent_id: 1, order_number: 4 },
    { id: 5, name: 'Books', parent_id: null, order_number: 5 }
];

type DataRow = {
    id: number;
    name: string;
    parent_id: number | null;
    order_number: number;
};

type Props = {
    data?: DataRow[];
};

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

const StatusesTable: React.FC<Props> = () => {
    const [data, setData] = useState<DataRow[]>(sampleData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your actual API endpoint returning the data array
                const response = await axios.get<DataRow[]>('http://localhost:3000/api/status/findAll');
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
            <h2>Statuses Table</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Parent ID</th>
                        <th style={styles.th}>Order Number</th>
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
                        data.map(({ id, name, parent_id, order_number }) => (
                            <tr key={id}>
                                <td style={styles.td}>{id}</td>
                                <td style={styles.td}>{name}</td>
                                <td style={styles.td}>{parent_id !== null ? parent_id : '-'}</td>
                                <td style={styles.td}>{order_number}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StatusesTable;
