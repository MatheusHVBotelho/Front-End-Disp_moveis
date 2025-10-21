import React, { createContext, useContext, useState } from "react";

// 🌞 Tema claro
const lightTheme = {
  background: "#f2f2f4",
  card: "#fff",
  text: "#1f2d3d",
  button: "#1f2d3d",
  buttonText: "#fff",
};

// 🌙 Tema escuro
const darkTheme = {
  background: "#1f2d3d",
  card: "#2d3a4d",
  text: "#f2f2f4",
  button: "#f2f2f4",
  buttonText: "#1f2d3d",
};

// Criando contexto
const ThemeContext = createContext();

// Hook para usar tema
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider para envolver o app
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
