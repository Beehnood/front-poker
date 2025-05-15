import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { miser, seCoucher } from './Jouer';

type Player = {
    id: number;
    name: string;
    isAI: boolean;
};
import '../styles.css';



const Partie = () => {
    const [mode, setMode] = useState<'play' | 'watch' | null>(null);
    const [players, setPlayers] = useState<Player[]>([]);
    const { tableId } = useParams();

    const handleJoinTable = (mode: 'play' | 'watch') => {
        setMode(mode);

        if (mode === 'play') {
            setPlayers([
                { id: 1, name: 'Vous', isAI: false },
                { id: 2, name: 'IA 1', isAI: true },
                { id: 3, name: 'IA 2', isAI: true },
            ]);
        } else if (mode === 'watch') {
            setPlayers([
                { id: 1, name: 'IA 1', isAI: true },
                { id: 2, name: 'IA 2', isAI: true },
                { id: 3, name: 'IA 3', isAI: true },
            ]);
        }
    };

    const [montant, setMontant] = useState(0);
    const [message, setMessage] = useState('');

    const joueurId = 1; // L'utilisateur est toujours le joueur 1

    const handleMiser = async () => {
        const result = await miser(joueurId, montant);
        setMessage(result.message || 'Mise effectuée');
    };

    const handleSeCoucher = async () => {
        const result = await seCoucher(joueurId);
        setMessage(result.message || 'Vous vous êtes couché');
        // console.log("Se coucher");
        
    };

    return (
        <div className="container table choix">
            <div className="content" >
                <div></div>
                <h1>Table de Poker #{tableId}</h1>
                {!mode ? (
                    <div>
                        <p>Choisissez une option :</p>
                        <div>
                            <button onClick={() => handleJoinTable('play')}>Jouer</button>
                            {/* <button onClick={() => handleJoinTable('watch')}>Regarder</button> */}
                        </div>
                    </div>
                ) : (
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Partie;