import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InicioScreen from "./InicioScreen";
import MenuScreen from "./MenuScreen";
import DisciplinaScreen from "./DisciplinaScreen";
import DificuldadeScreen from "./DificuldadeScreen";
import QuizScreen from "./QuizScreen";
import PerfilScreen from "./PerfilScreen";
import ConfiguracoesScreen from "./ConfiguracoesScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CriarConta" component={CriarContaScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Disciplina" component={DisciplinaScreen} />
      <Stack.Screen name="Dificuldade" component={DificuldadeScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Perfil" component={PerfilScreen} />
      <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
    </Stack.Navigator>
  );
}
