import '../styles.css';
import { Link } from 'react-router-dom';
// import poker2 from '../assets/images/poker2.jpg';
import phone from '../assets/images/phone.jpg';
import realtime from '../assets/images/realtime.jpg';

function Test() {
    return (
        <div className='container'>
            <div className='header'>
                <h1>Meilleur joueur de Poker<br/> en France!</h1>
            </div>

            <div className='content'>
                <div className='play'>
                    <h1>Jouer maintenant !</h1>
                    <div>
                        <Link to="/game" className='button'>Rejoindre une partie</Link>
                    </div>
                </div>

                <div className='informations'>
                    <h1>Pourquoi jouer ici ?</h1>
                    <div className='infos'>
                        <div className='info'>
                            <div>
                                <h2>Comptabile mobile</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='login-register'>
                    
                </div>


            </div>
        </div>
    )
}

export default Test;