import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

/** Botão nativo simples. Uso: <ExemploButton />.
 * https://reactnative.dev/docs/button
 */
export default function ExemploButton() {
  const [contador, setContador] = useState(0);
  const [mensagem, setMensagem] = useState('Toque em um botão.');

  // A função é passada ao onPress; não use onPress={incrementar()}, pois executaria na renderização.
  function incrementar() {
    setContador(anterior => anterior + 1);
    setMensagem('Contador incrementado!');
  }

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Button: ações e desabilitação</Text>
      <Text style={styles.texto}>Contador: {contador}</Text>
      {/* title é o rótulo e onPress é a ação (ambos obrigatórios).
          color muda o fundo no Android e o texto no iOS.
          accessibilityLabel descreve a ação ao leitor de tela. */}
      <View style={styles.espaco}>
        <Button title="Somar 1" onPress={incrementar} color="#1d4ed8" accessibilityLabel="Adicionar um ao contador" />
      </View>
      {/* disabled impede a ação; neste caso, só é possível zerar após somar. */}
      <View style={styles.espaco}>
        <Button title="Zerar" disabled={contador === 0} onPress={() => {
          setContador(0);
          setMensagem('Contador zerado.');
        }} />
      </View>
      <View style={styles.espaco}><Button title="Sempre desabilitado" disabled onPress={() => setMensagem('Não será executado.')} /></View>
      <Text style={styles.texto}>{mensagem}</Text>
      <Text>Compare a aparência no Android e no iOS.</Text>
      {/* Button não aceita style. Use uma View para margem/largura.
          Para customizar borda, conteúdo e feedback, use Pressable. */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  texto: { fontSize: 18, marginVertical: 12 },
  espaco: { marginBottom: 16 },
});
