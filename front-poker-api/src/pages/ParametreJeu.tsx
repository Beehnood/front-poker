
// import React, { useState } from 'react';
import '../styles.css';

const ParametreJeu = () => {
    return (
        <>
         <div>
            <h2>Paramètres de jeu</h2>
            <div>
                <label>
                    Mode sombre :
                    <input type="checkbox" />
                </label>
                <label>
                    Animations :
                    <input type="checkbox" />
                </label>
                <label>
                    Vitese des annimations :
                    <input type="checkbox" />
                </label>
                <label>
                    Style de table :
                    <input type="checkbox" />
                </label>
                <label>
                    Affichage des cartes communes :
                    <input type="checkbox" />
                </label>
                <label>
                    Mode gaucher / Droiter :
                    <input type="checkbox" />
                </label>
            </div>
        </div>
        <div>
            <h2>Paramètres audio</h2>
            <div>
                <label>
                    Musique de fond:
                    <input type="checkbox" />
                </label>
                <label>
                    Effets sonores :
                    <input type="checkbox" />
                </label>
                <label>
                    Notifications sonores :
                    <input type="checkbox" />
                </label>
            </div>
        </div>
        <div>
            <h2>Langue & régionalisation</h2>
            <div>
                <label>
                    Langue de l'interface:
                    <input type="checkbox" />
                </label>
                <label>
                    Monnaie affichée :
                    <select>
                        <option value="euro">Euro</option>
                        <option value="dollar">Dollar</option>
                        <option value="livre">Livre</option>
                    </select>
                </label>
            </div>
        </div>
        <div>
            <h2>Confidentialité & sécurité</h2>
            <div>
                <label>
                    Jeu anonyme / visibilté :
                    <input type="checkbox" />
                </label>
                <label>
                    Notifications par email
                    <input type="checkbox" />
                </label>
                <label>
                    Consentement RGPD / gestion des cookies
                    <input type="checkbox" />
                </label>
            </div>
        </div>
        <div>
            <h2>Jetons & boutique</h2>
            <div>
                <label>
                    Voir les achats passés
                    <input type="checkbox" />
                </label>
                <label>
                    Gestion des moyens de paiement
                    <input type="checkbox" />
                </label>
                <label>
                    Activer les achats in-app 
                    <input type="checkbox" />
                </label>
            </div>
        </div>
        <div>
            <h2>Aide & support</h2>
            <div>
                <label>
                    FAQ / tutoriel rapide
                    <input type="checkbox" />
                </label>
                <label>
                    Contacter le support
                    <input type="checkbox" />
                </label>
                <label>
                    Version de l'application 
                    <input type="checkbox" />
                </label>
                <label>
                    Voir les règles du poker 
                    <input type="checkbox" />
                </label>
            </div>
        </div>
        <div>
            <h2>Légal</h2>
            <div>
                <label>
                    Conditions générales d'utilisation
                    <input type="checkbox" />
                </label>
                <label>
                    Politique de Confidentialité
                    <input type="checkbox" />
                </label>
                <label>
                    Mentions légales 
                    <input type="checkbox" />
                </label>
            </div>
        </div>
        </>
    );
};

export default ParametreJeu;






