import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./ThemeContext";

// Telas
import HomeScreen from "./InicioScreen";
import MenuScreen from "./MenuScreen";
import DisciplinaScreen from "./DisciplinaScreen";
import DificuldadeScreen from "./DificuldadeScreen";
import QuizScreen from "./QuizScreen";
import PerfilScreen from "./PerfilScreen";
import ConfiguracoesScreen from "./ConfiguracoesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Disciplina" component={DisciplinaScreen} />
          <Stack.Screen name="Dificuldade" component={DificuldadeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Perfil" component={PerfilScreen} />
          <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
