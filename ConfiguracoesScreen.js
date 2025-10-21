import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "./ThemeContext";

export default function ConfiguracoesScreen({ navigation }) {
  const { tema, modoEscuro, alternarModo } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.background }]}>
      <View style={[styles.card, { backgroundColor: tema.card }]}>
        <Text style={[styles.title, { color: tema.text }]}>Configurações</Text>

        {/* 🔊 Som (exemplo fixo, sem persistência) */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tema.button }]}
          onPress={() => console.log("Alternar som aqui")}
        >
          <Text style={[styles.buttonText, { color: tema.buttonText }]}>
            🔊 Som: Ligado
          </Text>
        </TouchableOpacity>

        {/* 🌙 Alternar modo escuro/claro */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tema.button }]}
          onPress={alternarModo}
        >
          <Text style={[styles.buttonText, { color: tema.buttonText }]}>
            {modoEscuro ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
          </Text>
        </TouchableOpacity>

        {/* 🔙 Botão Voltar */}
        <TouchableOpacity
          style={[styles.voltarButton, { backgroundColor: tema.button }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, { color: tema.buttonText }]}>← Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
    elevation: 4,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 6,
  },
  voltarButton: {
    width: "100%",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { fontSize: 16, fontWeight: "600" },
});
