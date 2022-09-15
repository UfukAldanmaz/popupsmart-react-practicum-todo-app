import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.style.backgroundColor = theme === 'dark' ? 'rgb(32, 31, 31)' : '';
        let column = document.getElementById('column');
        column.style.backgroundColor = theme === 'dark' ? 'black' : '';
    }, [theme])


    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeContext;