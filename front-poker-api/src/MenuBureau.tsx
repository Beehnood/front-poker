import React, { useState } from 'react';
import './menu.css';

const MenuBureau = () => {
    // TODO: Replace this with real authentication logic
    const [isLoggedIn] = useState(false);

    return (
        <header className="menu-bureau-header">
            <div className="menu-bureau-logo">
                <h1><a href="/">CasinoRoyal</a></h1>
            </div>
            <nav className="menu-bureau-nav">
                <ul>
                    <li>
                        <a href='/'>Accueil</a>
                    </li>
                    <li>
                        <a href='/game'>Jouer</a>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <a href='/profile'>Mon profile</a>
                            </li>
                            <li>
                                <a href='/logout'>Se déconnecter</a>
                            </li>
                        </>
                    ) : (
                        <li>
                            <a href='/connexion'>Se connecter</a>
                        </li>
                    )}
                    {/* <li>
                        <a href='/connexion'>Se connecter</a>
                    </li>
                    <li>
                        <a href='/logout'>Se déconnecter</a>
                    </li> */}
                </ul>
            </nav>
        </header>
    );
};

export default MenuBureau;