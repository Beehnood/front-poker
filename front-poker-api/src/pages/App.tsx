// App.jsx
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
// import Partie from './pages/Partie';
import TableJeu from './TableDeJeu'
// import ParametreUtilisateur from './pages/ParametreUtilisateur';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/parametre_jeu" element={<ParametreJeu />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/game" element={<Game />} />
          <Route path="/partie" element={<Partie />} />
          <Route path="/partie/:tableId" element={<Partie />} />
          <Route path="/table" element={<TableJeu />} />
          {/* <Route path="/parametre_utilisateur" element={<ParametreUtilisateur />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;