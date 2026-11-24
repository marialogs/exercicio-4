import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ExercicioTextInput() {
    const [textoCampo, setTextoCampo] = useState<string>('');
    const [numeroCampo, setNumeroCampo] = useState<number>(0);

    function armazenarNumero(texto: string) {
        if (Number.isNaN(texto)) {
            setNumeroCampo(0)
        } else {
            setNumeroCampo(Number.parseFloat(texto))
        }
    }

    const [digitos, setDigitos] = useState('');

    // adicionar zeros a esquerda tendo 3 digitos
    const preenchido = digitos.padStart(3, '0');

    const texto = `${preenchido.slice(0, -2)},${preenchido.slice(-2)}`;

    function alterarPreco(valorDigitado: string) {
        const somenteDigitos = valorDigitado.replace(/\D/g, '');
        setDigitos(somenteDigitos.replace(/^0+/, ''));
    }

    const numeroOpcao1 = Number.parseFloat(texto.replace(',', '.'));

    const numeroOpcao2 = Number.parseFloat(digitos) / 100;

    return (
        <View>
            <Text>Campo com múltiplas linhas</Text>
            <TextInput
                onChangeText={(texto) => { setTextoCampo(texto) }}
                value={textoCampo}
                style={styles.campoTexto}
                multiline
            />

            <Text>Campo para senha</Text>
            <TextInput
                onChangeText={(texto) => { setTextoCampo(texto) }}
                value={textoCampo}
                style={styles.campoTexto}
                secureTextEntry={true}
            />

            <Text>Campo com placeholder</Text>
            <TextInput
                placeholder="Digite o seu nome"
                placeholderTextColor={'pink'}
                style={styles.campoTexto} />

            <Text>Campo com teclado numérico</Text>
            <TextInput
                keyboardType="numeric"
                style={styles.campoTexto}
                onChangeText={(texto) => alterarPreco(texto)}
                value={texto} />
        </View>
    )
}

const styles = StyleSheet.create({
    campoTexto: {
        borderWidth: 2,
        borderColor: '#045220',
        borderRadius: 5
    }
})