import React from 'react';

export const themes = {
    light: {
        foreground: "#000000",
        background: "#D5EAF5"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
}

const ThemeContext = React.createContext(themes.light);

export default ThemeContext;