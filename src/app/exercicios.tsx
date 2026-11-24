import Exercicio1 from "@/components/Exercicio1";
import Exercicio2 from "@/components/Exercicio2";
import Exercicio3 from "@/components/Exercicio3";
import { useState } from "react";
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Cada exemplo tem export default e pode ser importado/instanciado isoladamente.
const EXERCICIOS = [
    { nome: 'Exercício 1', Componente: Exercicio1 },
    { nome: 'Exercício 2', Componente: Exercicio2 },
    { nome: 'Exercício 3', Componente: Exercicio3 }
];

export default function Exercicios() {
    const [indice, setIndice] = useState(0);
    const [alturaCabecalho, setAlturaCabecalho] = useState(0);
    const insets = useSafeAreaInsets();
    const { nome, Componente } = EXERCICIOS[indice];

    return (
        <View style={styles.tela}>
            <View
                onLayout={evento => setAlturaCabecalho(evento.nativeEvent.layout.height)}>
                <Text style={styles.titulo}>Exercícios</Text>
                <Text style={styles.dica}>Deslize o menu e selecione um exercício.</Text>
                {/* Só o menu rola na horizontal. A área do exemplo é uma View com flex: 1,
            evitando aninhar FlatList/SectionList em ScrollView vertical. */}
                <ScrollView
                    horizontal
                    style={styles.menu}
                    contentContainerStyle={styles.opcoes}>
                    {EXERCICIOS.map((exercicio, posicao) => (
                        <Pressable
                            key={exercicio.nome}
                            style={[styles.opcao, posicao === indice && styles.ativa]}
                            onPress={() => {
                                Keyboard.dismiss();
                                setIndice(posicao);
                            }}
                        >
                            <Text style={posicao === indice ? styles.textoAtivo : styles.textoOpcao}>{exercicio.nome}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.exercicio}>
                {/* key reinicia o estado ao trocar de exemplo. O de teclado recebe o
            deslocamento do cabeçalho e da área segura, medidos nesta tela.
            Se o navegador adicionar outro cabeçalho, considere sua altura também. */}
                {/* {nome === 'KeyboardAvoidingView' ? (
                    <ExemploKeyboardAvoidingView key={nome} keyboardVerticalOffset={alturaCabecalho + insets.top} />
                ) : <Componente key={nome} />} */}
                <Componente key={nome} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#f8fafc'
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#172554',
        paddingHorizontal: 16,
        paddingTop: 12
    },
    dica: {
        paddingHorizontal: 16,
        paddingTop: 6,
        color: '#334155'
    },
    menu: {
        height: 64,
        flexGrow: 0
    },
    opcoes: {
        alignItems: 'center',
        paddingHorizontal: 12
    },
    opcao: {
        borderRadius: 8,
        padding: 12,
        marginRight: 8,
        backgroundColor: '#e2e8f0'
    },
    ativa: {
        backgroundColor: '#1d4ed8'
    },
    textoAtivo: {
        color: '#fff',
        fontWeight: 'bold'
    },
    textoOpcao: {
        color: '#172554'
    },
    exercicio: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#cbd5e1'
    },
});