import '../styles.css';
import { Link } from 'react-router-dom';

function Regles() {
    return (
        <div>
            <div className='container rules'>
                <div className='content'>
                    <div className='rule'>
                        <h1>Règlement du Poker Texas Hold'em</h1>
                        <section>
                            <h2>1. Introduction</h2>
                            <p>
                                Le Poker Texas Hold'em est un jeu de cartes populaire joué dans le monde entier. Ce règlement détaille les règles officielles pour les parties de Poker Texas Hold'em, telles qu'elles sont généralement pratiquées dans les casinos et tournois.
                            </p>
                        </section>

                        <section>
                            <h2>2. Objectif du jeu</h2>
                            <p>
                                L'objectif est de former la meilleure combinaison de cinq cartes possible à partir de deux cartes privatives (cartes fermées) et de cinq cartes communes, ou de remporter le pot en misant de façon à ce que tous les autres joueurs se couchent.
                            </p>
                        </section>

                        <section>
                            <h2>3. Déroulement d'une main</h2>
                            <ol>
                                <li>
                                    <strong>Distribution des cartes :</strong> Chaque joueur reçoit deux cartes privatives, faces cachées.
                                </li>
                                <li>
                                    <strong>Premier tour d'enchères (Pré-flop) :</strong> Les joueurs misent à tour de rôle, en commençant par le joueur à gauche de la grosse blind.
                                </li>
                                <li>
                                    <strong>Le Flop :</strong> Trois cartes communes sont posées face visible au centre de la table.
                                </li>
                                <li>
                                    <strong>Deuxième tour d'enchères :</strong> Les joueurs restants peuvent miser, suivre, relancer ou se coucher.
                                </li>
                                <li>
                                    <strong>Le Tournant (Turn) :</strong> Une quatrième carte commune est révélée.
                                </li>
                                <li>
                                    <strong>Troisième tour d'enchères :</strong> Nouveau tour de mises.
                                </li>
                                <li>
                                    <strong>La Rivière (River) :</strong> Une cinquième et dernière carte commune est révélée.
                                </li>
                                <li>
                                    <strong>Dernier tour d'enchères :</strong> Dernier tour de mises.
                                </li>
                                <li>
                                    <strong>Abattage (Showdown) :</strong> Si plusieurs joueurs restent, ils montrent leurs cartes. Le joueur avec la meilleure main de cinq cartes remporte le pot.
                                </li>
                            </ol>
                        </section>

                        <section>
                            <h2>4. Les mises</h2>
                            <ul>
                                <li><strong>Blindes :</strong> Avant la distribution, deux joueurs placent des mises forcées : la petite blinde et la grosse blinde.</li>
                                <li><strong>Actions possibles :</strong> Se coucher, suivre, relancer, checker (si aucune mise n'a été faite).</li>
                                <li><strong>Relance :</strong> Les relances doivent être au moins égales à la mise précédente.</li>
                                <li><strong>Tapis (All-in) :</strong> Un joueur peut miser tous ses jetons restants.</li>
                            </ul>
                        </section>

                        <section>
                            <h2>5. Classement des mains</h2>
                            <ol>
                                <li><strong>Quinte Flush Royale :</strong> As, Roi, Dame, Valet, 10 de la même couleur.</li>
                                <li><strong>Quinte Flush :</strong> Cinq cartes consécutives de la même couleur.</li>
                                <li><strong>Carré :</strong> Quatre cartes de même valeur.</li>
                                <li><strong>Full :</strong> Trois cartes de même valeur + une paire.</li>
                                <li><strong>Couleur :</strong> Cinq cartes de la même couleur.</li>
                                <li><strong>Suite :</strong> Cinq cartes consécutives de couleurs différentes.</li>
                                <li><strong>Brelan :</strong> Trois cartes de même valeur.</li>
                                <li><strong>Double Paire :</strong> Deux paires différentes.</li>
                                <li><strong>Paire :</strong> Deux cartes de même valeur.</li>
                                <li><strong>Carte haute :</strong> La carte la plus forte si aucune combinaison n'est formée.</li>
                            </ol>
                        </section>

                        <section>
                            <h2>6. Règles de comportement</h2>
                            <ul>
                                <li>Respecter les autres joueurs et le croupier.</li>
                                <li>Ne pas révéler ses cartes avant l'abattage.</li>
                                <li>Ne pas discuter d'une main en cours.</li>
                                <li>Agir dans le temps imparti pour ne pas ralentir la partie.</li>
                            </ul>
                        </section>

                        <section>
                            <h2>7. Cas particuliers</h2>
                            <ul>
                                <li><strong>Partage du pot :</strong> Si deux joueurs ont la même main, le pot est partagé équitablement.</li>
                                <li><strong>Jetons insuffisants :</strong> Un joueur peut faire tapis avec moins que la mise requise, un pot annexe est alors créé.</li>
                                <li><strong>Cartes brûlées :</strong> Avant chaque distribution de cartes communes, une carte est brûlée (retirée du jeu).</li>
                            </ul>
                        </section>

                        <section>
                            <h2>8. Glossaire</h2>
                            <ul>
                                <li><strong>Pot :</strong> Ensemble des mises en cours.</li>
                                <li><strong>Blinde :</strong> Mise forcée placée avant la distribution.</li>
                                <li><strong>Check :</strong> Passer son tour sans miser.</li>
                                <li><strong>All-in :</strong> Miser tous ses jetons.</li>
                                <li><strong>Showdown :</strong> Abattage des cartes pour déterminer le gagnant.</li>
                            </ul>
                        </section>

                        <section>
                            <h2>9. Liens utiles</h2>
                            <ul>
                                <li>
                                    <Link to="/">Retour à l'accueil</Link>
                                </li>
                                <li>
                                    <a href="https://fr.wikipedia.org/wiki/Texas_hold%27em" target="_blank" rel="noopener noreferrer">
                                        En savoir plus sur le Texas Hold'em
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <div className='footer'>
                        <p>© 2025 CasinoRoyal. Tous droits réservés.</p>
                        <p>Politique de confidentialité | Conditions d'utilisation</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Regles;