import React, { useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const SUBJECTS = [
  "portugues",
  "matematica",
  "quimica",
  "fisica",
  "ingles",
  "historia",
  "geografia",
  "biologia"
];

export default function TestarQuestoesScreen() {
  useEffect(() => {
    async function testarQuestoes() {
      console.log("🔍 Iniciando varredura de matérias e dificuldades...\n");

      for (const subject of SUBJECTS) {
        for (let dificuldade = 1; dificuldade <= 3; dificuldade++) {
          const url = `https://api-questoes-production.up.railway.app/api/questao/materia?materia=${subject}&dificuldade=${dificuldade}`;
          try {
            const response = await axios.get(url);
            const count = Array.isArray(response.data)
              ? response.data.length
              : 0;
            console.log(
              `📘 ${subject} (dificuldade ${dificuldade}) → ${count} questões`
            );
          } catch (error) {
            console.log(
              `❌ Erro em ${subject} (dificuldade ${dificuldade}):`,
              error.response?.status,
              error.response?.data?.title || error.message
            );
          }
        }
      }

      console.log("\n✅ Varredura finalizada!");
    }

    testarQuestoes();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#121212",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
        Testando todas as matérias e dificuldades...
        {"\n"}Veja os resultados no console.
      </Text>
    </View>
  );
}
