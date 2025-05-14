import React from 'react';
// import './TableDeJeu.css';
import '../styles.css';

const TableDeJeu = () => {
  // Données simulées pour les joueurs et les cartes
  const joueurs = [
    { id: 1, nom: 'IA 1', cartes: ['🂡', '🂢'] },
    { id: 2, nom: 'Utilisateur', cartes: ['🂣', '🂤'] },
    { id: 3, nom: 'IA 2', cartes: ['🂥', '🂦'] },
  ];

  const cartesSurTable = ['🂧', '🂨', '🂩', '🂪', '🂫'];

  const actions = ['Miser', 'Se coucher', 'Suivre'];

    return (
        <div className='container table'>
            <div className="content jeu">
                <h1>Table de Jeu</h1>

                <div className="joueurs">
                    {joueurs.map((joueur) => (
                    <div key={joueur.id} className="joueur">
                        <h2>{joueur.nom}</h2>
                        <div className="cartes">
                        {joueur.cartes.map((carte, index) => (
                            <span key={index} className="carte">{carte}</span>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>

                <div className="cartes-sur-table">
                    <h2>Cartes sur la table</h2>
                    <div className="cartes">
                    {cartesSurTable.map((carte, index) => (
                        <span key={index} className="carte">{carte}</span>
                    ))}
                    </div>
                </div>

                <div className="actions">
                    <h2>Actions</h2>
                    <div className='action'>
                        {actions.map((action, index) => (
                        <button key={index} className="bouton">{action}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableDeJeu;
