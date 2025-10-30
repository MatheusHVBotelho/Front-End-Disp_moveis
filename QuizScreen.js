import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { useTheme } from "./ThemeContext";

export default function QuizScreen({ route, navigation }) {
    const { materia, dificuldade } = route.params;
    const { tema } = useTheme();

    const [questoes, setQuestoes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);
    const [mostrarResposta, setMostrarResposta] = useState(false);

    useEffect(() => {
        const carregarQuestoes = async () => {
            try {
                console.log("🔎 Enviando params:", { materias: materia, dificuldade });

                const response = await api.get("/api/questao/materia", {
                    params: { materias: materia, dificuldade },
                });

                console.log("📥 Retorno bruto da API:", response.data);

                setQuestoes(response.data);
            } catch (error) {
                console.error("❌ Erro ao buscar questões:", error);
            } finally {
                setCarregando(false);
            }
        };

        carregarQuestoes();
    }, [materia, dificuldade]);

    // 💡 FUNÇÃO salvarHistorico CORRIGIDA:
    // Salva o histórico como um OBJETO, acumulando acertos e totais.
    const salvarHistorico = async (acertosTotais) => {
        try {
            const totalQuestoesJogadas = questoes.length;

            const historicoSalvo = await AsyncStorage.getItem("historico");
            // Inicializa como OBJETO (dicionário)
            const historico = historicoSalvo ? JSON.parse(historicoSalvo) : {}; 

            // 1. OBTÉM o registro existente para a matéria atual (ou inicia com 0)
            const registroExistente = historico[materia] || { acertos: 0, total: 0 };

            // 2. CALCULA os novos totais SOMANDO o novo jogo ao registro existente
            const acertosAcumulados = registroExistente.acertos + acertosTotais;
            const totalAcumulado = registroExistente.total + totalQuestoesJogadas;

            // 3. CRIA o novo registro acumulado
            const novoRegistroAcumulado = {
                acertos: acertosAcumulados,
                total: totalAcumulado,
                data: new Date().toISOString(), // Data do último quiz
            };

            // 4. ATUALIZA o histórico, substituindo o antigo registro da matéria pelo acumulado
            const novoHistorico = {
                ...historico, // Mantém os registros das outras matérias
                [materia]: novoRegistroAcumulado, // Agora é o valor ACUMULADO
            };

            await AsyncStorage.setItem("historico", JSON.stringify(novoHistorico));
            console.log("📘 Histórico acumulado e atualizado:", novoHistorico);
        } catch (error) {
            console.error("Erro ao salvar histórico:", error);
        }
    };

    if (carregando) {
        return (
            <View style={[styles.loading, { backgroundColor: tema.background }]}>
                <ActivityIndicator size="large" color={tema.text} />
                <Text style={{ color: tema.text }}>Carregando questões...</Text>
            </View>
        );
    }

    if (questoes.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: tema.background }]}>
                <Text style={[styles.title, { color: tema.text }]}>Nenhuma questão encontrada.</Text>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: tema.button }]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={[styles.buttonText, { color: tema.buttonText }]}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const questaoAtual = questoes[indiceAtual];

    const selecionarAlternativa = (alternativa) => {
        const acertou = alternativa === questaoAtual.respostaCorreta;
        // Não atualiza o estado de acertos aqui, apenas a variável local
        const novosAcertos = acertou ? acertos + 1 : acertos; 

        setRespostaSelecionada(alternativa);
        setMostrarResposta(true);
        
        // Atualiza o estado de acertos aqui
        setAcertos(novosAcertos); 

        setTimeout(() => {
            if (indiceAtual < questoes.length - 1) {
                setIndiceAtual(indiceAtual + 1);
                setRespostaSelecionada(null);
                setMostrarResposta(false);
            } else {
                // Ao final do quiz, chama salvarHistorico com o total de acertos
                salvarHistorico(novosAcertos); 
                navigation.navigate("Resultado", {
                    acertos: novosAcertos,
                    total: questoes.length,
                    materia,
                });
            }
        }, 1000);
    };

    return (
        <View style={[styles.container, { backgroundColor: tema.background }]}>
            <Text style={[styles.title, { color: tema.text }]}>{questaoAtual.enunciado}</Text>

            {questaoAtual.alternativas.map((alt, index) => {
                const isSelecionada = respostaSelecionada === alt;
                const isCorreta = mostrarResposta && alt === questaoAtual.respostaCorreta;
                const isErrada = mostrarResposta && isSelecionada && alt !== questaoAtual.respostaCorreta;

                return (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.button,
                            { backgroundColor: tema.button },
                            isCorreta && { backgroundColor: "#4CAF50" },
                            isErrada && { backgroundColor: "#E53935" },
                        ]}
                        disabled={mostrarResposta}
                        onPress={() => selecionarAlternativa(alt)}
                    >
                        <Text style={[styles.buttonText, { color: tema.buttonText }]}>{alt}</Text>
                    </TouchableOpacity>
                );
            })}

            <Text style={[styles.progress, { color: tema.text }]}>
                Questão {indiceAtual + 1} de {questoes.length}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center" },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 16, textAlign: "center" },
    button: {
        padding: 14,
        borderRadius: 10,
        marginVertical: 6,
    },
    buttonText: { color: "#fff", fontWeight: "500", textAlign: "center" },
    loading: { flex: 1, justifyContent: "center", alignItems: "center" },
    progress: { textAlign: "center", marginTop: 20 },
});
