import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";

export default function ResultadoScreen({ route, navigation }) {
  const { tema } = useTheme();
  const { acertos, total, materia } = route.params;

  const percentual = ((acertos / total) * 100).toFixed(1);

  return (
    <View style={[styles.container, { backgroundColor: tema.background }]}>
      <Text style={[styles.title, { color: tema.text }]}>Resultado</Text>
      <Text style={[styles.subtitle, { color: tema.text }]}>
        Matéria: {materia}
      </Text>

      <View style={styles.card}>
        <Text style={[styles.resultText, { color: tema.text }]}>
          Você acertou
        </Text>
        <Text style={[styles.percent, { color: tema.text }]}>
          {acertos} / {total}
        </Text>
        <Text style={[styles.resultText, { color: tema.text }]}>
          ({percentual}% de acertos)
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: tema.button }]}
        onPress={() => navigation.navigate("Menu")}
      >
        <Text style={[styles.buttonText, { color: tema.buttonText }]}>
          Voltar ao Menu
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  card: {
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
    width: "85%",
    marginBottom: 30,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
  },
  percent: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 8,
  },
  button: {
    padding: 14,
    borderRadius: 30,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
