// App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import Accueil from './Accueil';
import Connexion from './Connexion';
import Inscription from './Inscription';
import Profile from './Profile';
import ParametreJeu from './ParametreJeu';
import Stats from './Stats';
import Game from './Game';
import Partie from './Partie';
import TableJeu from './TableDeJeu'
import Regles from './Regles';

const AppContent = () => {
  


  return (
    <Layout>
      
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/parametre_jeu" element={<ParametreJeu />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/game" element={<Game />} />
        <Route path="/partie" element={<Partie />} />
        <Route path="/partie/:tableId" element={<Partie />} />
        <Route path="/table" element={<TableJeu />} />
        <Route path="/rules" element={<Regles />} />
        <Route path="/logout" element={<Connexion />} />
        <Route path="*" element={<h1 style={{ color: 'red' }}>Ooopps !!! Page non trouvée</h1>} />
      </Routes>
    </Layout>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}