import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";

export default function PerfilScreen({ navigation }) {
  const { tema } = useTheme(); 

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: tema.background }]}
    >
      <Text style={[styles.title, { color: tema.text }]}>Perfil</Text>
      <Text style={[styles.text, { color: tema.text }]}>
        Aqui ficarão as informações do usuário futuramente.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: tema.button }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, { color: tema.buttonText }]}>
          Voltar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    width: 140,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
