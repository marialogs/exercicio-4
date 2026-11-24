import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ContadorProps = {
    titulo?: string,
    quantidade: number
}

function Contador(props: ContadorProps) {
    return (
        <View style={styles.card_contador}>
            <Text style={styles.texto_contador}>Titulo: {props.titulo}</Text>
            <Text style={styles.texto_contador}>Quantidade: {props.quantidade}</Text>
        </View>
    )
}

export default function Exercicio1() {
    const [pessoas, setPessoas] = useState<number>(0);

    function cliqueEntrou() {
        console.log('Cliquei entrou')
        setPessoas((valorAnterior) => valorAnterior + 1)
        console.log(pessoas)
    }

    function cliqueSaiu() {
        console.log('Cliquei saiu')
        setPessoas((valorAnterior) => valorAnterior - 1)
        console.log(pessoas)
    }

    return (
        <View style={styles.container}>
            <Contador titulo={'Alunos'} quantidade={pessoas}/>
            <Pressable onPress={cliqueEntrou}>
                <View style={styles.botao}>
                    <Text style={styles.texto_botao}>Entrou</Text>
                </View>
            </Pressable>

            <Pressable
                onPress={cliqueSaiu}
                disabled={pessoas <= 0}>
                <View style={[styles.botao, styles.vermelho, pessoas <= 0 && styles.cinza]}>
                    <Text style={styles.texto_botao}>Saiu</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botao: {
        backgroundColor: 'blue',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        marginVertical: 5
    },
    vermelho: {
        backgroundColor: 'red'
    },
    cinza: {
        backgroundColor: 'grey'
    },
    texto_botao: {
        color: 'white'
    },
    card_contador: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'green'
    },
    texto_contador: {
        fontSize: 15,
        fontWeight: "bold"
    }
})