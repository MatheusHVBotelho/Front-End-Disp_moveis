import axios from "axios";

export const SUBJECTS = [
  "portugues",
  "matematica",
  "quimica",
  "fisica",
  "ingles",
  "historia",
  "geografia",
  "informatica"
];

export async function getQuestions(subject, difficulty) {
  console.log(`Buscando questões para: ${subject} (Dificuldade: ${difficulty})`);

  // ✅ Converte a dificuldade (string ou número)
  const difficultyMap = {
    facil: 1,
    fácil: 1,
    medio: 2,
    médio: 2,
    dificil: 3,
    difícil: 3,
  };

  const difficultyValue = difficultyMap[difficulty?.toLowerCase?.()] || difficulty;

  try {
    // ✅ Endpoint e parâmetros corretos da API
    const response = await axios.get(
      "https://api-questoes-production.up.railway.app/api/questao/materia",
      {
        params: {
          materia: subject,
          dificuldade: difficultyValue,
        },
      }
    );

    const data = response.data.map((item) => ({
      id: item.id,
      question: item.enunciado || item.pergunta || "Sem enunciado",
      options: [
        item.alternativa_a,
        item.alternativa_b,
        item.alternativa_c,
        item.alternativa_d,
        item.alternativa_e,
      ].filter(Boolean),
      correctIndex: ["a", "b", "c", "d", "e"].indexOf(
        item.alternativa_correta?.toLowerCase?.() || ""
      ),
      explanation: item.explicacao || "Sem explicação disponível.",
      disciplina: item.disciplina || "Sem disciplina",
      dificuldade: item.dificuldade || "Sem dificuldade",
    }));

    console.log(`✅ Foram encontradas ${data.length} questões.`);
    return data;
  } catch (error) {
    console.error("❌ Erro ao buscar questões:", error.response?.data || error.message);
    return [];
  }
}
