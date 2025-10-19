import "./TopBar.css";
import { useDarkMode } from "../../src/contexts/DarkModeContext";

import reload from "/images/reload.webp";
import Logo from "/images/Logo.webp";

const TopBar = () => {
    const reloadPage = () => window.location.reload();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className="topBar">
            <img className="topLogo" src={Logo} />
            <h1 className="topName">Markdown to LaTex Converter</h1>
            <div className="topBar-buttons">
                <button className="darkModeBtn" onClick={toggleDarkMode} title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}>
                    {isDarkMode ? (
                        // Sol para modo claro
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="5" fill="currentColor"/>
                            <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    ) : (
                        // Luna para modo oscuro
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="currentColor"/>
                        </svg>
                    )}
                </button>
                <button className="reload" onClick={reloadPage}>
                    <img className="reloadLogo" src={reload} />
                </button>
            </div>
        </div>
    )
}

export default TopBar;