import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../contexts/ThemeContext";

const Login = () => {
    const [userName, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const handleUserName = (e) => {
        localStorage.getItem('username');
        setUsername(e.target.value);
    }
    return <div id="column" className="login-container">
        <div className="login-column">
            <button onClick={toggleTheme} className="login-theme-btn">
                {theme === 'dark' ? <span>🌞</span> : <span>🌙</span>}
            </button>

            <p className="login-text">Please, enter a username</p>
            <input placeholder="username" value={userName} className="login-input" onChange={handleUserName} />
            <span className="login-error">{error}</span>
            <button className="login-btn" onClick={() => {
                localStorage.setItem('username', userName);
                userName.trim().length < 3 ? setError("Your username must have three characters at least!")
                    : navigate('/todos', { state: { username: userName } });
            }}>Enter</button></div>
    </div>
}

export default Login;