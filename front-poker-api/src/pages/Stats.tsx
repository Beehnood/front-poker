// import React, { useState } from 'react';
import '../styles.css';

const Stats = () => {
    return (
        <div className="profile-container login">
            <h1>Profil de l'utilisateur</h1>
            
            <div className="profile-section stats">
                <h2>Statistiques de l'utilisateur</h2>
                <h3>Statistiques générales</h3>
                <div>
                    <p>Nombre de partie jouées</p>
                    <p>14</p>
                </div>
                <div>
                    <p>Heures totales de jeux</p>
                    <p>2</p>
                </div>
                <div>
                    <p>Victoire / Défaite</p>
                    <p>73%</p>
                </div>
                <div>
                    <p>Plus grosse main gagnée</p>
                    <p>50€</p>
                </div>
                <div>
                    <p>Plus grosse mise gagnée</p>
                    <p>200€</p>
                </div>

                <h3>Statistiques financières</h3>
            </div>

        </div>
    );
};

export default Stats;