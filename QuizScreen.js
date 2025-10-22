import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import api from "./api";

export default function QuizScreen({ route, navigation }) {
  const { materia, dificuldade } = route.params;
  const [questoes, setQuestoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const carregarQuestoes = async () => {
      try {
        const response = await api.get("/api/questao/materia", {
          params: {
            materias: [materia], 
            dificuldade: dificuldade, 
          },
        });

        
        const dadosFormatados = response.data.map((q) => ({
          enunciado: q.enunciado || q.pergunta || "Sem enunciado",
          alternativas: [
            { texto: q.alternativa_a },
            { texto: q.alternativa_b },
            { texto: q.alternativa_c },
            { texto: q.alternativa_d },
            { texto: q.alternativa_e },
          ].filter(Boolean),
          correta: q.alternativa_correta, 
          explicacao: q.explicacao || "Sem explicação",
        }));

        setQuestoes(dadosFormatados);
      } catch (error) {
        console.error("Erro ao buscar questões:", error);
      } finally {
        setCarregando(false);
      }
    };

    carregarQuestoes();
  }, [materia, dificuldade]);

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1f2d3d" />
        <Text>Carregando questões...</Text>
      </View>
    );
  }

  if (questoes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhuma questão encontrada.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const questaoAtual = questoes[indiceAtual];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questaoAtual.enunciado}</Text>

      {questaoAtual.alternativas.map((alt, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Text style={styles.buttonText}>{alt.texto}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (indiceAtual < questoes.length - 1) setIndiceAtual(indiceAtual + 1);
          else navigation.navigate("Menu");
        }}
      >
        <Text style={styles.nextButtonText}>
          {indiceAtual < questoes.length - 1 ? "Próxima" : "Finalizar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f4", padding: 20, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
  button: { padding: 14, backgroundColor: "#1f2d3d", borderRadius: 10, marginVertical: 6 },
  buttonText: { color: "#fff" },
  nextButton: { marginTop: 20, backgroundColor: "#4caf50", padding: 14, borderRadius: 10, alignItems: "center" },
  nextButtonText: { color: "#fff", fontWeight: "bold" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
