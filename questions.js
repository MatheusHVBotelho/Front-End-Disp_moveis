import axios from "axios";

export const SUBJECTS = ["Portugues", "Matematica", "Quimica", "Fisica", "Ingles", "Historia", "Geografia", "Biologia"];

export async function getQuestions(subject, difficulty) {
 
  console.log(`Buscando questões para: ${subject} (Dificuldade: ${difficulty})`);
  
  try {
    const response = await axios.get("https://api-questoes-production.up.railway.app/questoes");

  
    const data = response.data
      .map((item) => ({
        id: item.id,
        question: item.enunciado || item.pergunta || "Sem enunciado",
        options: [
          item.alternativa_a,
          item.alternativa_b,
          item.alternativa_c,
          item.alternativa_d,
          item.alternativa_e,
        ].filter(Boolean),
        correctIndex:
          ["a", "b", "c", "d", "e"].indexOf(
            item.alternativa_correta?.toLowerCase?.() || ""
          ),
        explanation: item.explicacao || "Sem explicação disponível.",
       
        disciplina: item.disciplina || 'Sem disciplina', 
        dificuldade: item.dificuldade || 'Sem dificuldade',
      }))
   
      .filter(q => q.disciplina.toLowerCase() === subject.toLowerCase()); 

    return data;
    
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    return [];
  }
}
