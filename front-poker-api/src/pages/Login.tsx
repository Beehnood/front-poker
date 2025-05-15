import { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignUp) {
            console.log("Inscription:", { email, password });
        } else {
            console.log("Connexion:", { email, password });
        }
    };

    return (
        <div className="login-form">
            <h2>{isSignUp ? "Inscription" : "Connexion"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                    />
                </div>
                <button type="submit">
                    {isSignUp ? "S'inscrire" : "Se connecter"}
                </button>
            </form>
            <p>
                {isSignUp ? "Déjà un compte ?" : "Pas de compte ?"}
                <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                >
                    {isSignUp ? "Se connecter" : "S'inscrire"}
                </button>
            </p>
        </div>
    );
};

export default LoginForm;