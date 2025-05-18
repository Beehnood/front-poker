import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/', { replace: true });
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted with:', formData); // Debug log
        try {
            const response = await fetch('http://localhost:3000/api/auth/signin', { // Changé de /login à /signin
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });
            console.log('Fetch response:', response); // Debug log
            const data = await response.json();
            console.log('Fetch data:', data); // Debug log
            if (response.ok) {
                localStorage.setItem('access_token', data.access_token); // Assure-toi que ton backend renvoie un access_token
                setSuccess('Connexion réussie !');
                window.dispatchEvent(new Event('token-updated'));
            } else {
                setError(data.message || 'Erreur lors de la connexion');
            }
        } catch (err) {
            console.error('Fetch error:', err); // Debug log
            setError('Erreur réseau. Veuillez réessayer.');
        }
    };

    if (success) {
        return null;
    }

    return (
        <div className="container_form_wrapper">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Mot de passe"
                />
                <button type="submit">Se connecter</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Connexion;