import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./pages/Logout";
import "./styles.css"; // Confirme que ce chemin est correct

const MenuBureau = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("token-updated", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("token-updated", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/connexion");
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <header className="menu-bureau-header">
      <div className="menu-bureau-logo">
        <h1>
          <a onClick={() => handleLinkClick("/")}>CasinoRoyal</a>
        </h1>
      </div>
      <nav className="menu-bureau-nav">
        <ul>
          <li>
            <a onClick={() => handleLinkClick("/")}>Accueil</a>
          </li>
          <li>
            <a onClick={() => handleLinkClick("/game")}>Jouer</a>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <a onClick={() => handleLinkClick("/connexion")}>
                  Se connecter
                </a>
              </li>
              <li>
                <a onClick={() => handleLinkClick("/inscription")}>
                  S'inscrire
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a onClick={() => handleLinkClick("/profil")}>Profil</a>
              </li>

              <li>
                <Logout onLogout={handleLogout} />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MenuBureau;
