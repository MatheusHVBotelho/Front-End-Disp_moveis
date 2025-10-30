import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "./ThemeContext";

export default function PerfilScreen({ navigation }) {
  const { tema } = useTheme();
  const [historico, setHistorico] = useState({});

  useEffect(() => {
    const carregarHistorico = async () => {
      const data = await AsyncStorage.getItem("historico");
      if (data) setHistorico(JSON.parse(data));
    };
    carregarHistorico();
  }, []);

  const limparHistorico = async () => {
    await AsyncStorage.removeItem("historico");
    setHistorico({});
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: tema.background }]}>
      <Text style={[styles.title, { color: tema.text }]}>Perfil</Text>

      <ScrollView style={{ width: "90%", marginTop: 10 }}>
        {Object.keys(historico).length === 0 ? (
          <Text style={[styles.text, { color: tema.text }]}>
            Nenhum histórico de jogo encontrado.
          </Text>
        ) : (
          Object.entries(historico).map(([materia, dados], index) => {
            const percentual = ((dados.acertos / dados.total) * 100).toFixed(1);
            return (
              <Text key={index} style={[styles.text, { color: tema.text }]}>
                📘 {materia}: {percentual}% de acertos ({dados.acertos}/{dados.total})
              </Text>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: tema.button, marginTop: 20 }]}
        onPress={limparHistorico}
      >
        <Text style={[styles.buttonText, { color: tema.buttonText }]}>Limpar Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: tema.button, marginTop: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, { color: tema.buttonText }]}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 40 },
  title: { fontSize: 22, fontWeight: "700" },
  text: { fontSize: 16, marginVertical: 6 },
  button: { padding: 12, borderRadius: 20, alignItems: "center", width: 180 },
  buttonText: { fontWeight: "700", fontSize: 16 },
});
