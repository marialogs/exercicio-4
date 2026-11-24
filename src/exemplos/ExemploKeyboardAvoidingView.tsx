import React, { useState } from 'react';
import { Button, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

/** Ajusta o layout quando o teclado aparece.
 * https://reactnative.dev/docs/keyboardavoidingview
 * Uso: <ExemploKeyboardAvoidingView />. O pai precisa de flex: 1.
 */
type Props = { keyboardVerticalOffset?: number };

export default function ExemploKeyboardAvoidingView({ keyboardVerticalOffset = 0 }: Props) {
  const [habilitado, setHabilitado] = useState(true);
  const [mensagem, setMensagem] = useState('');
  const [enviada, setEnviada] = useState('');

  return (
    // behavior define o ajuste: padding, height ou position.
    // iOS/Android respondem de formas diferentes; teste no dispositivo real.
    // enabled permite comparar com/sem ajuste.
    // keyboardVerticalOffset compensa a distância até o topo desta View
    // (por exemplo, um cabeçalho de navegação). Ajuste conforme o layout real.
    <KeyboardAvoidingView
      style={styles.tela} enabled={habilitado}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        // Permite acionar o botão sem precisar fechar o teclado antes.
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>KeyboardAvoidingView: teclado e formulário</Text>
        <View style={styles.linha}>
          <Text>Habilitar ajuste</Text>
          <Switch value={habilitado} onValueChange={setHabilitado} accessibilityLabel="Habilitar ajuste de teclado" />
        </View>
        <Text>Toque no campo ao final. Digite, feche o teclado, desabilite o ajuste e compare.</Text>
        <Text>O próprio Android também pode redimensionar a janela; o resultado depende da configuração nativa.</Text>
        <Text style={styles.resultado}>Última mensagem: {enviada || '(nenhuma)'}</Text>
        {/* marginTop: auto coloca o formulário na base quando sobra espaço.
            ScrollView mantém o conteúdo acessível em telas pequenas. */}
        <View style={styles.formulario}>
          <Text>Mensagem</Text>
          <TextInput
            style={styles.campo} value={mensagem} onChangeText={setMensagem}
            placeholder="Digite uma mensagem" accessibilityLabel="Mensagem"
          />
          <Button title="Enviar e fechar teclado" disabled={!mensagem.trim()} onPress={() => {
            setEnviada(mensagem.trim());
            setMensagem('');
            Keyboard.dismiss(); // Fecha o teclado; não é um método do KeyboardAvoidingView.
          }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1 },
  conteudo: { flexGrow: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' },
  resultado: { marginVertical: 20 },
  formulario: { marginTop: 'auto', paddingTop: 24, paddingBottom: 16 },
  campo: { borderWidth: 1, borderColor: '#64748b', borderRadius: 8, padding: 12, marginVertical: 12, color: '#111827', backgroundColor: '#fff' },
});
