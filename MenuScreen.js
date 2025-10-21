import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext"; // 👈 Importa o contexto do tema

export default function MenuScreen({ navigation }) {
  const { tema } = useTheme(); // 👈 Usa o tema atual

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.background }]}>
      <View style={[styles.card, { backgroundColor: tema.card }]}>
        <Text style={[styles.title, { color: tema.text }]}>Menu</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: tema.button }]}
          onPress={() => navigation.navigate("Disciplina")}
        >
          <Text style={[styles.buttonText, { color: tema.buttonText }]}>JOGAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: tema.button }]}
          onPress={() => navigation.navigate("Perfil")}
        >
          <Text style={[styles.buttonText, { color: tema.buttonText }]}>PERFIL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: tema.button }]}
          onPress={() => navigation.navigate("Configuracoes")}
        >
          <Text style={[styles.buttonText, { color: tema.buttonText }]}>CONFIGURAÇÕES</Text>
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
});
