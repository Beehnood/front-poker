import { useState } from 'react';
import '../styles.css';

interface Joueur {
    id: string | number;
    name?: string;
    cards?: string[];
}

const TableDeJeu = () => {
    const [joueurs, setJoueurs] = useState<Joueur[]>([]);
    const [cartesSurTable, setCartesSurTable] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [joined, setJoined] = useState(false);
    const tableId = '1'; // Simule un ID de table (on le passera via une route plus tard)

    const fetchTableData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/tables/${tableId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données de la table');
            }

            const data = await response.json();
            setJoueurs(data.players || []);
            setCartesSurTable(data.communityCards || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        }
    };

    const handleJoinTable = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/tables/${tableId}/join`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la tentative de rejoindre la table');
            }

            setJoined(true);
            setSuccess('Table rejointe avec succès !');
            fetchTableData(); // Récupère les données de la table après avoir rejoint
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        }
    };


    const actionMap: { [key: string]: string } = {
    'Miser': 'raise',
    'Se coucher': 'fold',
    'Suivre': 'call',
};
   const handleAction = async (action: string) => {
    try {
        const apiAction = actionMap[action];
        let url = `http://localhost:3000/api/tables/${tableId}/actions`;
        if (apiAction === 'raise') {
            const amount = 10; // Montant fixe pour l'exemple (peut être un input)
            url = `http://localhost:3000/api/tables/${tableId}/actions/${apiAction}/${amount}`;
        } else {
            url = `http://localhost:3000/api/tables/${tableId}/actions`;
        }

        const response = await fetch(url, {
            method: apiAction === 'raise' ? 'GET' : 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                ...(apiAction !== 'raise' && { 'Content-Type': 'application/json' }),
            },
            ...(apiAction !== 'raise' && { body: JSON.stringify({ action: apiAction }) }),
        });

        if (!response.ok) {
            throw new Error('Action échouée');
        }

        await response.json();
        setSuccess(`Action "${action}" effectuée !`);
        fetchTableData();
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
};

const actions = ['Miser', 'Se coucher', 'Suivre'];
    return (
        <div className='container table'>
            <div className='content jeu'>
                <h1>Table de Jeu</h1>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                {!joined ? (
                    <button className="button" onClick={handleJoinTable}>
                        Rejoindre la table
                    </button>
                ) : (
                    <>
                        <div className='joueurs'>
                            {joueurs.map((joueur: Joueur) => (
                                <div key={joueur.id} className='joueur'>
                                    <h2>{joueur.name || 'Joueur Inconnu'}</h2>
                                    <div className='cartes'>
                                        {joueur.cards?.length
                                            ? joueur.cards.map((carte: string, index: number) => (
                                                <span key={index} className='carte'>{carte}</span>
                                            ))
                                            : <p>Pas de cartes</p>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='cartes-sur-table'>
                            <h2>Cartes sur la table</h2>
                            <div className='cartes'>
                                {cartesSurTable.map((carte: string, index: number) => (
                                    <span key={index} className='carte'>{carte}</span>
                                ))}
                            </div>
                        </div>
                        <div className='actions'>
                            <h2>Actions</h2>
                            <div className='action'>
                                {actions.map((action, index) => (
                                    <button
                                        key={index}
                                        className='button'
                                        onClick={() => handleAction(action)}
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TableDeJeu;