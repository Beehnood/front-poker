import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { miser, seCoucher } from './Jouer';
import backImage from '../assets/images/back.png'; // Assurez-vous que le chemin est correct

type Player = {
    id: number;
    name: string;
    isAI: boolean;
    cards?: string[]; // Ajoute les cartes ici
};
import '../styles.css';

const Partie = () => {
    const [mode, setMode] = useState<'play' | 'watch' | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const [cartes, setCartes] = useState<string[]>([]);
    const { tableId } = useParams();
    const [montant, setMontant] = useState(0);
    const [message, setMessage] = useState('');
    // Toutes les possibilités de cartes (valeurs et couleurs)
    const valeurs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const couleurs = ['S', 'H', 'D', 'C']; // S: Pique, H: Coeur, D: Carreau, C: Trèfle
    const toutesLesCartes = valeurs.flatMap(valeur => 
        couleurs.map(couleur => `${valeur}${couleur}`)
    );

    const joueurId = 1; // L'utilisateur est toujours le joueur 1

    // Appelle l'API pour récupérer les cartes du joueur
    const fetchCartesJoueur = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/tables/${tableId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            if (!response.ok) throw new Error('Erreur lors de la récupération des cartes');
            const data = await response.json();
            // Trouve le joueur courant dans la liste des joueurs de la table
            const joueur = data.players.find((p: any) => p.id === joueurId);
            setCartes(joueur?.hand || []);
        } catch (err) {
            setMessage('Impossible de récupérer les cartes');
        }
    };

    const handleJoinTable = (mode: 'play' | 'watch') => {
        setMode(mode);
        if (mode === 'play') {
            setPlayers([
                { id: 1, name: 'Vous', isAI: false },
                { id: 2, name: 'IA 1', isAI: true },
                { id: 3, name: 'IA 2', isAI: true },
            ]);
            fetchCartesJoueur(); // Récupère les cartes après avoir rejoint
        } else if (mode === 'watch') {
            setPlayers([
                { id: 1, name: 'IA 1', isAI: true },
                { id: 2, name: 'IA 2', isAI: true },
                { id: 3, name: 'IA 3', isAI: true },
            ]);
            setCartes([]);
        }
    };

    const handleMiser = async () => {
        const result = await miser(joueurId, montant, tableId);
        setMessage(result.message || 'Mise effectuée');
        fetchCartesJoueur(); // Met à jour les cartes après action
    };

    const handleSeCoucher = async () => {
        const result = await seCoucher(joueurId, tableId);
        setMessage(result.message || 'Vous vous êtes couché');
        fetchCartesJoueur();
    };

    return (
        <div className="container table choix">
            <div className="content" >
                <div></div>
                <h1>Table de Poker #{tableId}</h1>
                {!mode ? (
                    <div className='table-choix'>
                        <p>Choisissez une option :</p>
                        <div>
                            <button onClick={() => handleJoinTable('play')}>Jouer</button>
                            {/* <button onClick={() => handleJoinTable('watch')}>Regarder</button> */}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='table-partie'>
                            <h2>{mode === 'play' ? 'Mode Joueur' : 'Mode Spectateur'}</h2>
                            <div className='table-info'>
                                <h3>Joueurs à la table :</h3>
                                <ul>
                                    {players.map((player) => (
                                        <li key={player.id}>
                                            {player.name} {player.isAI ? '(IA)' : '(Vous)'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {mode === 'play' && (
                                <div>
                                    <h3>Vos cartes :</h3>
                                    <div>
                                        {cartes.length > 0
                                            ? cartes.map((carte, idx) => (
                                                <span key={idx} className="carte">{carte}</span>
                                            ))
                                            : <span>Aucune carte</span>
                                        }
                                    </div>
                                </div>
                            )}
                            <div>
                                <h3>Actions :</h3>
                                {mode === 'play' && (
                                    <div>
                                        <button onClick={handleMiser}>Miser 100</button>
                                        <button onClick={handleSeCoucher}>Se coucher</button>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setMode(null)} className='button'>Quitter la partie</button>
                            <div className='deck'>
                                {/* Exemple d'affichage de cartes en front */}
                                <div style={{ marginTop: '16px' }}>
                                    <h4>Exemple de cartes </h4>
                                    <div>
                                        {Array.from({ length: 5 }).map((_, idx) => {
                                            const randomIndex = Math.floor(Math.random() * toutesLesCartes.length);
                                            const carte = toutesLesCartes[randomIndex];
                                            return (
                                                <span key={idx} className="carte">{carte}</span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='joueur_ia numero_un'>
                            <div>
                                <img src={backImage} />
                                <img src={backImage} />
                                <img src={backImage} />
                            </div>
                            <p>IA 1</p>
                        </div>
                        <div className='joueur_ia numero_deux'>
                            <div>
                                <img src={backImage} />
                                <img src={backImage} />
                                <img src={backImage} />
                            </div>
                            <p>IA 2</p>
                        </div>
                        {/* <div className='joueur_ia numero_trois'>
                            <img src={backImage} />
                            <img src={backImage} />
                            <img src={backImage} />
                        </div> */}
                    </>
                )}
                {/* {message && <p>{message}</p>} */}
            </div>
        </div>
    );
};

export default Partie;