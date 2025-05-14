import React, { useState } from 'react';
import './menu.css';

const MenuBureau = () => {
    return (
        <header className="menu-bureau-header">
            <div className="menu-bureau-logo">
                <h1>Casino Royal</h1>
            </div>
            <nav className="menu-bureau-nav">
                <ul>
                    <li>
                        <a href='/'>Accueil</a>
                    </li>
                    <li>
                        <a href='/connexion'>Profil</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MenuBureau;