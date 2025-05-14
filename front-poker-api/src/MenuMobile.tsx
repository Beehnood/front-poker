import './menu.css';
import user from './assets/images/icones/user.png';
import home from './assets/images/icones/home.png';
import pokercards from './assets/images/icones/poker-cards.png';

const MenuMobile = () => {

  return (
    <nav className="menu-mobile">
        <ul>
            <a href="/" className="menu-item">
                <img src={home} alt="Accueil" />
            </a>
            <a href="/game" className="menu-item central">
                <img src={pokercards} alt="Ajouter" />
            </a>
            <a href="/profile" className="menu-item">
                <img src={user} alt="Profil" />
            </a>
        </ul>
    </nav>
  );
};

export default MenuMobile;