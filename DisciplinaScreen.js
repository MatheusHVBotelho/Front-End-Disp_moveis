import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SUBJECTS } from "./questions";
import { useTheme } from "./ThemeContext"; // 👈 Importa o contexto

export default function DisciplinaScreen({ navigation }) {
  const { tema } = useTheme(); // 👈 Usa o tema global

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.background }]}>
      <View style={[styles.card, { backgroundColor: tema.card }]}>
        <Text style={[styles.title, { color: tema.text }]}>Escolha a Disciplina</Text>

        {SUBJECTS.map((materia, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: tema.button }]}
            onPress={() => navigation.navigate("Dificuldade", { materia })}
          >
            <Text style={[styles.buttonText, { color: tema.buttonText }]}>{materia}</Text>
          </TouchableOpacity>
        ))}

        {/* Botão Voltar */}
        <TouchableOpacity
          style={[styles.secondaryButton, { backgroundColor: tema.button }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.secondaryButtonText, { color: tema.buttonText }]}>
            ← Voltar
          </Text>
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
  buttonText: { fontSize: 16, fontWeight: "700" },
  secondaryButton: {
    width: "100%",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 16,
  },
  secondaryButtonText: { fontSize: 16, fontWeight: "700" },
});
