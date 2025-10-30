import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext"; // 👈 Importa o contexto de tema

export default function DificuldadeScreen({ navigation, route }) {
  const { materia } = route.params;
  const { tema, modoEscuro } = useTheme(); // 👈 Pega o tema e modo escuro do contexto

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.background }]}>
      <View style={[styles.card, { backgroundColor: tema.card }]}>
        <Text style={[styles.title, { color: tema.text }]}>
          Escolha a Dificuldade
        </Text>

        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: tema.button }]}
            onPress={() =>
              navigation.navigate("Quiz", { materia: materia, dificuldade: 1 })
            }
          >
            <Text style={[styles.buttonText, { color: tema.buttonText }]}>
              Fácil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: tema.button }]}
            onPress={() =>
              navigation.navigate("Quiz", { materia: materia, dificuldade: 2 })
            }
          >
            <Text style={[styles.buttonText, { color: tema.buttonText }]}>
              Médio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: tema.button }]}
            onPress={() =>
              navigation.navigate("Quiz", { materia: materia, dificuldade: 3 })
            }
          >
            <Text style={[styles.buttonText, { color: tema.buttonText }]}>
              Difícil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.backButton,
              { backgroundColor: modoEscuro ? "#333" : "#e5e7eb" },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={[
                styles.buttonText,
                { color: modoEscuro ? "#fff" : "#1f2d3d" },
              ]}
            >
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 18,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    fontWeight: "700",
  },
  backButton: {
    marginTop: 20,
  },
});
