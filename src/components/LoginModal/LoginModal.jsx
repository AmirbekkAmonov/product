import { useState } from "react";
import "./LoginModal.scss";

function LoginModal({ setIsLoginOpen }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email); 
    };

    const handleLogin = () => {
        if (!validateEmail(email)) {
            setError("Invalid email address!");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters!");
            return;
        }
        setIsLoginOpen(false); 
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("login-modal")) {
            setIsLoginOpen(false); 
        }
    };

    return (
        <div className="login-modal" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="close-btn" onClick={() => setIsLoginOpen(false)}>✖</button>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button className="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default LoginModal;
