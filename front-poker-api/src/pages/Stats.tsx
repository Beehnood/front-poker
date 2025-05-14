// import React, { useState } from 'react';
import '../styles.css';

const Stats = () => {
    return (
        <div className="profile-container login">
            <h1>Profil de l'utilisateur</h1>
            <h2>Statistiques de l'utilisateur</h2>
            
            <div className="profile-section stats">
                <div>
                    <div>
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
                    </div>

                    <div>
                        <h3>Statistiques financières</h3>
                        <div>
                            <p>Jetons gagnés/perdus (net)</p>
                            <p>500</p>
                        </div>
                        <div>
                            <p>Gain actuels en bankroll</p>
                            <p>1200</p>
                        </div>
                        <div>
                            <p>Jetons achtés (si boutique)</p>
                            <p>1200</p>
                        </div>
                        <div>
                            <p>Gain moyen par partie</p>
                            <p>50€</p>
                        </div>
                        <div>
                            <p>Rendement total</p>
                            <p>200€</p>
                        </div>
                    </div>

                    <div>
                        <h3>Statistiques de style de jeu</h3>
                        <div>
                            <p>% de mains jouées (VPIP)</p>
                            <p>10%</p>
                        </div>
                        <div>
                            <p>% d'agressivité (AF)</p>
                            <p>27%</p>
                        </div>
                        <div>
                            <p>% de preflop raise</p>
                            <p>92%</p>
                        </div>
                        <div>
                            <p>% de check/fold</p>
                            <p>56%</p>
                        </div>
                        <div>
                            <p>% de bluff gagnant</p>
                            <p>68%</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3>Classement et performance</h3>
                        <div>
                            <p>Classement global</p>
                            <p>50e / 2985e</p>
                        </div>
                        <div>
                            <p>Classement hebdomadaire</p>
                            <p>xx</p>
                        </div>
                        <div>
                            <p>Rang dans un tournoi récent</p>
                            <p>xx</p>
                        </div>
                        <div>
                            <p>Badges ou trophées débloqués</p>
                            <p>x</p>
                        </div>
                        <div>
                            <p>Nombre de victoires en tournoi</p>
                            <p>xx</p>
                        </div>
                        <div>
                            <p>Série de victoires (win strikes)</p>
                            <p>xx</p>
                        </div>
                    </div>

                    <div>
                        <h3>Intéractions sociales</h3>
                        <div>
                            <p>Nombre d'ami</p>
                            <p>xx</p>
                        </div>
                        <div>
                            <p>Invitations envoyées</p>
                            <p>xx</p>
                        </div>
                        <div>
                            <p>Parties jouées avec des amis</p>
                            <p>xx</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Stats;