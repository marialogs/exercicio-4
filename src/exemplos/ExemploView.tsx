import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

/** View agrupa elementos e organiza o layout. Uso: <ExemploView />.
 * https://reactnative.dev/docs/view
 */
export default function ExemploView() {
  const [emLinha, setEmLinha] = useState(true);
  const [largura, setLargura] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>View: agrupamento e Flexbox</Text>
      <Button title="Alternar row / column" onPress={() => setEmLinha(valor => !valor)} />
      {/* style aceita um objeto ou um array; os últimos estilos têm prioridade.
          flexDirection define o eixo principal: row (horizontal) ou column (vertical).
          justifyContent distribui no eixo principal; alignItems alinha no eixo transversal.
          padding é espaço interno; margin é espaço externo.
          onLayout recebe medidas após o cálculo do layout. */}
      <View
        style={[styles.caixa, { flexDirection: emLinha ? 'row' : 'column' }]}
        onLayout={evento => setLargura(Math.round(evento.nativeEvent.layout.width))}
      >
        <View style={[styles.bloco, { backgroundColor: '#bfdbfe' }]}><Text>A</Text></View>
        <View style={[styles.bloco, { backgroundColor: '#bbf7d0' }]}><Text>B</Text></View>
        <View style={[styles.bloco, { backgroundColor: '#fde68a' }]}><Text>C</Text></View>
      </View>
      <Text>Direção: {emLinha ? 'row' : 'column'} | Largura medida: {largura}</Text>
      <Text style={styles.subtitulo}>Distribuição proporcional com flex</Text>
      {/* Com flexDirection="row", flex 1 e 2 repartem o espaço horizontal disponível. */}
      <View style={styles.proporcoes}>
        <View style={styles.um}><Text>flex: 1</Text></View>
        <View style={styles.dois}><Text>flex: 2</Text></View>
      </View>
      {/* accessible agrupa o cartão; accessibilityLabel descreve o grupo ao leitor de tela. */}
      <View accessible accessibilityLabel="Cartão do produto: leite, cinco reais" style={styles.cartao}>
        <Text>Leite</Text><Text>R$ 5,00</Text>
      </View>
      <Text>Experimente mudar justifyContent para center e alignItems para flex-start.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  subtitulo: { fontSize: 18, marginVertical: 16 },
  caixa: { minHeight: 240, padding: 12, marginVertical: 16, backgroundColor: '#e2e8f0', justifyContent: 'space-around', alignItems: 'center', borderRadius: 8 },
  bloco: { width: 60, height: 60, alignItems: 'center', justifyContent: 'center' },
  proporcoes: { flexDirection: 'row', height: 80 },
  um: { flex: 1, backgroundColor: '#bfdbfe', justifyContent: 'center', alignItems: 'center' },
  dois: { flex: 2, backgroundColor: '#bbf7d0', justifyContent: 'center', alignItems: 'center' },
  cartao: { padding: 16, marginVertical: 16, borderWidth: 1, borderColor: '#64748b' },
});
