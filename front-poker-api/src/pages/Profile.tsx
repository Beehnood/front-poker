import { useState } from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleSignup = () => {
        alert("Redirection vers la page d'inscription...");
    };

    if (!isLoggedIn) {
        return (
            <div className="profile-container no_login">
                <h1>Bienvenue</h1>
                <p>Veuillez vous connecter ou vous inscrire pour accéder à votre profil.</p>
                <button onClick={handleLogin}>Se connecter</button>
                <button onClick={handleSignup}>S'inscrire</button>
            </div>
        );
    }

    return (
        <div className="profile-container login">
            <h1>Profil de l'utilisateur</h1>

            <div className='profile-section user-info'>
                <div>
                    <div>
                        <img src="https://via.placeholder.com/150" alt="Profile" />
                    </div>

                    <div>
                        <h2>Nom d'utilisateur</h2>
                        <p>Nom d'utilisateur</p>
                    </div>
                </div>
            </div>
            
            <div className="profile-section links">
                <Link to="/stats" className='button'>Statistiques de l'utilisateurs</Link>
                <Link to="/parametre_jeu" className='button'>Parametre de jeu</Link>
                <Link to="/parametre_utilisateur" className='button'>Parametre de l'utilisateur</Link>
            </div>
            {/* <div className="profile-section">
                <h2>Paramètres de compte</h2>
                <label>
                    Nom d'utilisateur :
                    <input type="text" placeholder="Nom d'utilisateur" />
                </label>
                <br />
                <label>
                    Email :
                    <input type="email" placeholder="Email" />
                </label>
                <br />
                <button>Mettre à jour</button>
            </div> */}
        </div>
    );
};

export default Profile;