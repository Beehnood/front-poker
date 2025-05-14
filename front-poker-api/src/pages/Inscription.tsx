import React, { useState } from 'react';
import '../styles.css';

const Inscription = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        // Logique pour soumettre les données
        console.log('Formulaire soumis :', formData);
    };

    return (
        <div className='container_form_wrapper'>
            <div className='container_form'>
                <h2>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className='input'
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='input'
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className='input'
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className='input'
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>
                        S'inscrire
                    </button>
                </form>
        </div>
        </div>
    );
};

export default Inscription;