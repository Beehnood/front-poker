import React from 'react';
import { Link } from 'react-router-dom';

interface Table {
    id: number;
    name: string;
    players: number;
    maxPlayers: number;
}

const tables: Table[] = [
    { id: 1, name: 'Table 1', players: 3, maxPlayers: 6 },
    { id: 2, name: 'Table 2', players: 5, maxPlayers: 8 },
    { id: 3, name: 'Table 3', players: 2, maxPlayers: 4 },
];

const Game: React.FC = () => {
    return (
        <div className='container table'>
            <div className='content'>
                <h1>Liste des tables de Poker</h1>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {tables.map((table) => (
                        <li
                            key={table.id}
                            className='table-item'
                        >
                            <Link to={`/partie/${table.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h2>{table.name}</h2>
                                <p>
                                    Joueurs : {table.players} / {table.maxPlayers}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Game;