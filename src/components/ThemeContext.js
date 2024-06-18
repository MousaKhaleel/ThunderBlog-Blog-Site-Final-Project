import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({ isDark: localStorage.getItem('theme'), toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'light';
});
    // const [darkTheme]=useState({bg: "rgb(18, 18, 18)", txt: 'white'})
    // ...darkTheme,

    function toggleTheme(){
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    window.location.reload();
    }

    return(
      <ThemeContext.Provider value={{isDark, toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    )
  }
    // const [theme,setTheme]=useState('light')
    // useEffect(()=>{
    //     if(localStorage.getItem("theme")===null)
    //         localStorage.setItem('theme', theme)
    // },[theme])