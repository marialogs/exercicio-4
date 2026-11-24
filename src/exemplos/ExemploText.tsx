import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

/** Exibe textos, inclusive trechos com formatações diferentes.
 * Documentação: https://reactnative.dev/docs/text
 * Uso: <ExemploText />. Não precisa receber props.
 */
export default function ExemploText() {
  // useState guarda um valor; alterar esse valor atualiza a tela.
  const [toques, setToques] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Text: exibição e formatação</Text>
      {/* style configura fonte, cor e espaçamento. Texto deve ficar dentro de Text. */}
      <Text style={styles.paragrafo}>
        Textos aninhados herdam estilos do Text pai e fluem na mesma linha.
        <Text style={styles.destaque}> Este trecho tem destaque.</Text>
      </Text>
      {/* selectable permite selecionar/copiar; a interação varia por plataforma. */}
      <Text selectable style={styles.paragrafo}>Segure para selecionar este texto.</Text>
      {/* numberOfLines limita linhas; ellipsizeMode="tail" corta no final. */}
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.limitado}>
        Este texto é propositalmente longo para ultrapassar duas linhas. Observe
        as reticências no final quando não houver espaço para todo o conteúdo.
        Experimente mudar numberOfLines para 1 ou 3 e comparar os resultados.
      </Text>
      {/* onPress executa uma função ao tocar; a forma funcional usa o estado anterior. */}
      <Text
        onPress={() => setToques(anterior => anterior + 1)}
        accessibilityRole="button"
        style={styles.link}
      >
        Toque aqui: {toques} toque(s)
      </Text>
      {/* allowFontScaling respeita a preferência de tamanho de fonte do dispositivo. */}
      <Text allowFontScaling style={styles.paragrafo}>Altere o tamanho da fonte nas configurações do celular.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#172554' },
  paragrafo: { fontSize: 16, lineHeight: 24, marginBottom: 16, color: '#1f2937' },
  destaque: { fontWeight: 'bold', color: '#be123c' },
  limitado: { fontSize: 16, width: 230, marginBottom: 16, color: '#1f2937' },
  link: { fontSize: 18, color: '#1d4ed8', paddingVertical: 16 },
});
