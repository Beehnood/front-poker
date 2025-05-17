import { useState, useEffect } from "react";
import "../styles.css";
// import { set } from 'mongoose';
// import Logout from './Logout'; // Assure-toi que le chemin est correct

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
      setSuccess("Vous êtes déjà connecté.");
    }
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:3000/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la connexion");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      setIsLoggedIn(true);
      setSuccess("Connexion réussie !");
      console.log("Réponse API:", data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue");
      }
    }
  };

  return (
    <div className="container_form_wrapper">
      <div className="container_form">
        <h2>Connexion</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        {isLoggedIn ? (
          <div>
            <div>
              <p>Vous êtes connecté !</p>
            </div>
            <button>
              <a href="/Game">Aller au jeu</a>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
            </div>
            <p>
              Je n'ai pas de compte ? <a href="/inscription">Inscrivez-vous</a>
            </p>
            <button type="submit" className="button">
              submit
            </button>
          </form>
        )}
        {/* <p>Mot de passe oublié ? <a href='/forgot-password'>Réinitialiser</a></p> */}
        {/* <p>Pas encore inscrit ? <a href='/inscription'>Inscrivez-vous</a></p> */}
        {/* <Logout onLogout={() => setIsLoggedIn(false)} /> */}
      </div>
    </div>
  );
};

export default Connexion;
