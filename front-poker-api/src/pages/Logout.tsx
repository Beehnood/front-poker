import React, { useState } from 'react';
import '../styles.css';

const Logout = ({ onLogout }: { onLogout: () => void }) => {
    const [success, setSuccess] = useState<string | null>(null);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setSuccess('Déconnecté avec succès.');
        onLogout(); // Appelle la fonction pour mettre à jour l'état dans Connexion.tsx
    };

    return (
        <div className='container_form_wrapper'>
            <div className='container_form'>
                {localStorage.getItem('access_token') && (
                    <>
                        <button onClick={handleLogout} className='button'>Se déconnecter</button>
                        {success && <p className="success">{success}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Logout;