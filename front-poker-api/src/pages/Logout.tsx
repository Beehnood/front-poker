import { useState } from 'react';

const Logout = () => {
    const [success, setSuccess] = useState<string | null>(null);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setSuccess('Déconnecté avec succès.');
    };

    return (
        <div className='container_form_wrapper'>
            <div className='container_form'>
                <h2>Connexion</h2>
                {success && <p className="success">{success}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={(e) => e.preventDefault()}>
                </form>
                {localStorage.getItem('access_token') && (
                    <button onClick={handleLogout} className='button'>Se déconnecter</button>
                )}
            </div>
        </div>
    );
};

export default Logout;