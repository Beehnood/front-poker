import React, { useState } from 'react';
import '../styles.css';

const Connexion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Logique de connexion à implémenter ici
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className='container_form_wrapper'>
            <div className='container_form'>
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <div className='content_form'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='input'
                        />
                    </div>
                    <div className='content_form'>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='input'
                        />
                    </div>
                    <p>Je n'ai pas de compte ? <a href='/inscription'>Inscrivez-vous</a></p>
                    <button type="submit" className='button'>Se connecter</button>
                </form>
            </div>
        </div>
    );
};


export default Connexion;