import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function DificuldadeScreen({ navigation, route }) {
  const { materia } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Escolha a Dificuldade</Text>

        
        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Quiz", { materia: materia, dificuldade: 1 })
            }
          >
            <Text style={styles.buttonText}>Fácil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Quiz", { materia: materia, dificuldade: 2 })
            }
          >
            <Text style={styles.buttonText}>Médio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Quiz", { materia: materia, dificuldade: 3 })
            }
          >
            <Text style={styles.buttonText}>Difícil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, { color: "#1f2d3d" }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f4",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
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
    backgroundColor: "#1f2d3d",
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  backButton: {
    backgroundColor: "#e5e7eb",
    marginTop: 20,
  },
});
