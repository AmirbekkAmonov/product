import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import LoginModal from "../LoginModal/LoginModal";

function Header({ theme, toggleTheme, menuOpen, setMenuOpen }) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); 

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo">
                        <a href="#"><img src="/images/logo.webp" alt="" /></a>
                        <div className="nav">
                            <button 
                                className={location.pathname.includes("/product") ? "" : "active"}
                                onClick={() => navigate("/")}
                            >
                                Products
                            </button>
                            <a href="#"><button>Posts</button></a>
                            <a href="#"><button>Todos</button></a>
                        </div>
                    </div>
                    <div className="login">
                        <div className="basket">
                            <button>
                                <img
                                    src={theme === "light" ? "/icons/cart2.svg" : "/icons/cart.svg"}
                                    alt="Cart"
                                />
                            </button>
                            <button onClick={toggleTheme} className="theme-toggle">
                                <img src={theme === "light" ? "/icons/moon.svg" : "/icons/sun.svg"} alt="" />
                            </button>
                            <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <button onClick={() => setIsLoginOpen(true)}>Login</button>
                    </div>
                </div>
            </header>

            <div className={`sidebar ${menuOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setMenuOpen(false)}>✖</button>
                <div className="logo">
                    <a href="#"><img src="./images/logo.webp" alt="" /></a>
                </div>
                <button 
                    className={`link ${location.pathname.includes("/product") ? "" : "active"}`} 
                    onClick={() => { 
                        navigate("/"); 
                        setMenuOpen(false); 
                    }}
                >
                    Products
                </button>
                <a href="#" className="link">Posts</a>
                <a href="#" className="link">Todos</a>
                <button className="login-mobile" onClick={() => setIsLoginOpen(true)}>Login</button>
            </div>

            <div className={`overlay ${menuOpen ? "show" : ""}`} onClick={() => setMenuOpen(false)}></div>

            {isLoginOpen && <LoginModal setIsLoginOpen={setIsLoginOpen} />}
        </>
    );
}

export default Header;
