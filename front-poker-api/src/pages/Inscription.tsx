import React, { useState } from 'react';
import '../styles.css';

const Inscription = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.email,
                email: formData.email,
                password: formData.password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de l\'inscription');
        }

        const data = await response.json();
        if (data.access_token) {
            localStorage.setItem('access_token', data.access_token);
            setSuccess('Inscription réussie ! Token stocké.');
            // Déclenche un événement personnalisé pour notifier les changements
            window.dispatchEvent(new Event('token-updated'));
        } else {
            setSuccess('Inscription réussie !');
        }
        console.log('Réponse API:', data);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
};

    return (
        <div className='container_form_wrapper'>
            <div className='container_form'>
                <h2>Inscription</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
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
                    <div className='form-group'>
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
                    <div className='form-group'>
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
                    <p>Déjà un compte ? <a href='/connexion'>Connectez-vous</a></p>
                    <button type="submit" className='button'>S'inscrire</button>
                </form>
            </div>
        </div>
    );
};

export default Inscription;