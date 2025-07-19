import React, { CSSProperties, useState } from 'react';
import axios from 'axios';

interface IUserData {
    full_name: string;
    email: string;
    phone: string;
    providers_id: string;
    status_id: string;
    created_at: string;
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formGroup: {
        marginBottom: '1rem'
    },
    label: {
        marginBottom: '0.3rem',
        fontWeight: 'bold',
        display: 'block'
    },
    input: {
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        width: '100%',
        boxSizing: 'border-box'
    },
    error: {
        color: 'red',
        fontSize: '0.85rem',
        marginTop: '0.25rem',
        display: 'block'
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

const ContactForm = () => {
    const [formData, setFormData] = useState<IUserData>({
        full_name: '',
        email: '',
        phone: '',
        providers_id: '',
        status_id: '',
        created_at: ''
    });

    const [errors, setErrors] = useState({
        full_name: '',
        email: '',
        phone: '',
        providers_id: '',
        status_id: '',
        created_at: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3000/api/patient/create', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Server response:', response.data);
            alert('Form submitted successfully!');
            setFormData({
                full_name: '',
                email: '',
                phone: '',
                providers_id: '',
                status_id: '',
                created_at: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit} noValidate style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor='full_name' style={styles.label}>
                        Fullname:
                    </label>
                    <input
                        type='text'
                        id='full_name'
                        name='full_name'
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder='Enter your full name'
                        style={{ ...styles.input, borderColor: errors.full_name ? 'red' : '#ccc' }}
                        disabled={isSubmitting}
                    />
                    {errors.full_name && <span style={styles.error}>{errors.full_name}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor='email' style={styles.label}>
                        Email:
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter your email'
                        style={{ ...styles.input, borderColor: errors.email ? 'red' : '#ccc' }}
                        disabled={isSubmitting}
                    />
                    {errors.email && <span style={styles.error}>{errors.email}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor='phone' style={styles.label}>
                        Phone:
                    </label>
                    <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='Enter your phone number'
                        style={{ ...styles.input, borderColor: errors.phone ? 'red' : '#ccc' }}
                        disabled={isSubmitting}
                    />
                    {errors.phone && <span style={styles.error}>{errors.phone}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor='providers_id' style={styles.label}>
                        Providers ID:
                    </label>
                    <input
                        type='text'
                        id='providers_id'
                        name='providers_id'
                        value={formData.providers_id}
                        onChange={handleChange}
                        placeholder='Enter providers ID'
                        style={{ ...styles.input, borderColor: errors.providers_id ? 'red' : '#ccc' }}
                        disabled={isSubmitting}
                    />
                    {errors.providers_id && <span style={styles.error}>{errors.providers_id}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor='status_id' style={styles.label}>
                        Status ID:
                    </label>
                    <input
                        type='text'
                        id='status_id'
                        name='status_id'
                        value={formData.status_id}
                        onChange={handleChange}
                        placeholder='Enter status ID'
                        style={{ ...styles.input, borderColor: errors.status_id ? 'red' : '#ccc' }}
                        disabled={isSubmitting}
                    />
                    {errors.status_id && <span style={styles.error}>{errors.status_id}</span>}
                </div>

                <div style={styles.formGroup}>
                    <label htmlFor='created_at' style={styles.label}>
                        Created At:
                    </label>
                    <input
                        type='datetime-local'
                        id='created_at'
                        name='created_at'
                        value={formData.created_at}
                        onChange={handleChange}
                        style={{ ...styles.input, borderColor: errors.created_at ? 'red' : '#ccc' }}
                        disabled={isSubmitting}
                    />
                    {errors.created_at && <span style={styles.error}>{errors.created_at}</span>}
                </div>

                <button type='submit' style={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
