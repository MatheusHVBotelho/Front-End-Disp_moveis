import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext"; 

export default function InicioScreen({ navigation }) {
  const { tema } = useTheme(); 

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.background }]}>
      <View style={[styles.content, { backgroundColor: tema.card }]}>
        <Text style={[styles.title, { color: tema.text }]}>Bem-vindo ao Quiz de Olimpíadas!</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tema.button }]}
          onPress={() => navigation.replace("Menu")}
        >
          <Text style={[styles.buttonText, { color: tema.buttonText }]}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: {
    alignItems: "center",
    width: "80%",
    borderRadius: 20,
    padding: 30,
    elevation: 5,
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 30, textAlign: "center" },
  button: { paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30 },
  buttonText: { fontSize: 18, fontWeight: "700" },
});
