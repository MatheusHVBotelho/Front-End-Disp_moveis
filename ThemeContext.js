import React, { createContext, useContext, useState } from "react";

const lightTheme = {
  background: "#f2f2f4",
  card: "#fff",
  text: "#1f2d3d",
  button: "#1f2d3d",
  buttonText: "#fff",
};

const darkTheme = {
  background: "#1f2d3d",
  card: "#2d3a4d",
  text: "#f2f2f4",
  button: "#f2f2f4",
  buttonText: "#1f2d3d",
};

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(false);

  const alternarModo = () => setModoEscuro((prev) => !prev);

  const tema = modoEscuro ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ tema, modoEscuro, alternarModo }}>
      {children}
    </ThemeContext.Provider>
  );
}
