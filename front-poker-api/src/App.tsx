// App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Profile from './pages/Profile';
import ParametreJeu from './pages/ParametreJeu';
import Stats from './pages/Stats';
import Game from './pages/Game';
import Partie from './pages/Partie';
import TableJeu from './pages/TableDeJeu'
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