// questions.js
import axios from "axios";

// 1. CORREÇÃO: Exportando a lista de assuntos para ser usada pela DisciplinaScreen
export const SUBJECTS = ["Portugues", "Matematica", "Quimica", "Fisica", "Ingles", "Historia", "Geografia", "Biologia"];

/**
 * Busca questões da API e as formata.
 * Esta função agora recebe o assunto e a dificuldade (selecionados pelo usuário)
 * que podem ser usados para filtrar o endpoint da API, se ele suportar.
 */
export async function getQuestions(subject, difficulty) {
  // Neste ponto, você usaria 'subject' e 'difficulty' para filtrar a chamada da API,
  // por exemplo: `.../questoes?disciplina=${subject}&dificuldade=${difficulty}`
  // Como o endpoint atual é estático, faremos a chamada completa e um log de quais filtros foram pedidos.
  
  console.log(`Buscando questões para: ${subject} (Dificuldade: ${difficulty})`);
  
  try {
    const response = await axios.get("https://api-questoes-production.up.railway.app/questoes");

    // Ajuste de formato para combinar com a estrutura usada na QuizScreen
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
        // Adicionar filtros para uso posterior, caso a filtragem seja feita localmente
        disciplina: item.disciplina || 'Sem disciplina', 
        dificuldade: item.dificuldade || 'Sem dificuldade',
      }))
      // 2. FILTRAGEM LOCAL (Melhoria: Se a API não filtra, fazemos no cliente)
      // Note: O ideal é que a API faça o filtro.
      .filter(q => q.disciplina.toLowerCase() === subject.toLowerCase()); 

    return data;
    
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    return [];
  }
}
