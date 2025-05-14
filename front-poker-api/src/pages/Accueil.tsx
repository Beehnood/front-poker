import '../styles.css';
import { Link } from 'react-router-dom';
// import poker2 from '../assets/images/poker2.jpg';
import phone from '../assets/images/phone.jpg';
import realtime from '../assets/images/realtime.jpg';

function Test() {
    return (
        <div>
            <div className='header-container'>
                <div className='header'>
                    <h1>Meilleur joueur de Poker<br/> en France!</h1>
                </div>
            </div>
            <div className='container'>
                <div className='content'>
                    <div className='play'>
                        <h1>Jouer maintenant !</h1>
                        <div>
                            <Link to="/game" className='button party'>Rejoindre une partie</Link>
                        </div>
                    </div>

                    <div className='informations'>
                        <h1>Pourquoi jouer ici ?</h1>
                        <div className='infos'>
                            <div className='info'>
                                <div>
                                    <h2>Comptabile mobile</h2>
                                    <p>Notre site de poker propose une version mobile complète, permettant aux utilisateurs de jouer en toute liberté depuis leur smartphone ou tablette. Chaque transaction effectuée en mobile — que ce soit un dépôt, un retrait ou un gain — est automatiquement intégrée à notre système comptable centralisé. Cela garantit une transparence totale et une gestion financière rigoureuse, identique à celle de la version PC. Les données sont synchronisées en temps réel pour une continuité parfaite entre les différents supports.</p>
                                </div>

                                <div>
                                    <img src={phone} alt="PokerStars" />
                                </div>
                            </div>

                            <div className='info'>
                                <div>
                                    <img src={realtime} alt="PokerStars" />
                                </div>

                                <div>
                                    <h2>Partie en temps réels</h2>
                                    <p>Le jeu en temps réel sur notre site permet aux joueurs de participer à des parties de poker en direct, avec une fluidité optimale sur tous les appareils. Toutes les mises, gains et mouvements financiers sont enregistrés instantanément dans notre système comptable. Cela assure une traçabilité complète des opérations, indispensable pour la transparence et le respect des normes en vigueur. La comptabilité suit en temps réel le déroulement des parties, garantissant une gestion précise et sécurisée.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='login-register'>
                        
                    </div>

                    <div className='rules'>
                        <h1>Règles du Poker</h1>
                        <p>Vous ne connaissez pas les règles du Poker ?</p>
                        <p>Apprenez les bases et devenez un expert en un rien de temps. Découvrez les différentes combinaisons, les stratégies et les astuces pour améliorer votre jeu.</p>
                        <div>
                            <img src="https://via.placeholder.com/300x200" alt="Règles du Poker" />
                        </div>
                        <div>
                            <Link to="/rules" className='button rules-button'>Voir les règles</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Test;