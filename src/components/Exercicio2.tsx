import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ResumoPedidoProps = {
    nome: string,
    preco: number,
    quantidade: number
}

function ResumoPedido(props: ResumoPedidoProps){

    return (
        <>
            <Text style={styles.texto_resumo}>Nome: {props.nome}</Text>
            <Text style={styles.texto_resumo}>Preço: {props.preco.toFixed(2)}</Text>
            <Text style={styles.texto_resumo}>Quantidade: {props.quantidade}</Text>
            <Text style={styles.texto_resumo}>Valor Total: {(props.quantidade * props.preco).toFixed(2)}</Text>
        </>
    )
}

export default function Exercicio2(){
    const nome = "Jogo GTA VI";
    const preco = 550.90;

    const [quantidade, setQuantidade] = useState<number>(1);

    function cliqueAumentou(){
        setQuantidade((anterior) => anterior + 1)
    }

    function cliqueDiminuiu(){
        setQuantidade((anterior) => anterior - 1)
    }

    return(
        <View style={styles.container}>
            <ResumoPedido nome={nome} preco={preco} quantidade={quantidade}/>
            <Pressable onPress={cliqueAumentou}>
                <View style={styles.botao}>
                    <Text style={styles.texto_botao}> + </Text>
                </View>
            </Pressable>

            <Pressable
                onPress={cliqueDiminuiu}
                disabled={quantidade <= 1}>
                <View style={[styles.botao, styles.vermelho, quantidade <= 1 && styles.cinza]}>
                    <Text style={styles.texto_botao}>-</Text>
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
    texto_resumo: {
        fontSize: 20,
        fontWeight: '700'
    }
})