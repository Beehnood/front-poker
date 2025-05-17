import { useState } from "react";
import "./menu.css";
import { useNavigate } from "react-router-dom";

const MenuBureau = () => {
  // TODO: Replace this with real authentication logic
  // const [isLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/connexion"); // Redirige vers la page de connexion
  };

  return (
    <header className="menu-bureau-header">
      <div className="menu-bureau-logo">
        <h1>
          <a href="/">CasinoRoyal</a>
        </h1>
      </div>
      <nav className="menu-bureau-nav">
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/game">Jouer</a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <a href="/profile">Mon profile</a>
              </li>

              <li>
                <a href="/connexion" onClick={handleLogout}>
                  Se déconnecter
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/connexion">Se connecter</a>
              </li>
              <li>
                <a href="/inscription">S'inscrire</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MenuBureau;
