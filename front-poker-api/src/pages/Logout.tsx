import { useState } from "react";
import "../styles.css";

const Logout = ({ onLogout }: { onLogout: () => void }) => {
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setSuccess("Déconnecté avec succès.");
    onLogout();
  };

  return (
    <div >
      <div >
        {localStorage.getItem("access_token") ? (
            <li>
              < button onClick={handleLogout}>Se déconnecter</button>
            </li>        
        ) : (
          success && <p className="success">{success}</p>
        )}
      </div>
    </div>
  );
};

export default Logout;
