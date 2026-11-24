import React, { useRef } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

/** Rolagem de uma quantidade pequena de conteúdo. Uso: <ExemploScrollView />.
 * https://reactnative.dev/docs/scrollview
 * Renderiza todos os filhos; para listas longas, prefira FlatList/SectionList.
 */
export default function ExemploScrollView() {
  // useRef guarda a referência usada para chamar métodos do componente.
  const rolagem = useRef<ScrollView>(null);

  return (
    // A rolagem precisa de altura delimitada: flex: 1 aqui e nos pais.
    <View style={styles.tela}>
      <Text style={styles.titulo}>ScrollView: duas direções</Text>
      <Button title="Ir para o final" onPress={() => rolagem.current?.scrollToEnd({ animated: true })} />
      {/* style configura a janela; contentContainerStyle configura o conteúdo interno.
          showsVerticalScrollIndicator exibe o indicador de rolagem.
          keyboardShouldPersistTaps="handled" permite toques tratados por filhos com teclado aberto. */}
      <ScrollView
        ref={rolagem} style={styles.rolagem}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator keyboardShouldPersistTaps="handled"
      >
        <Text>Deslize os cartões na horizontal:</Text>
        {/* horizontal muda o eixo; aninhar eixos diferentes é adequado neste exemplo. */}
        <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={styles.faixa}>
          {['Filmes', 'Séries', 'Jogos', 'Livros', 'Música'].map(categoria => (
            <View key={categoria} style={styles.cartao}><Text>{categoria}</Text></View>
          ))}
        </ScrollView>
        {Array.from({ length: 15 }, (_, indice) => (
          <View key={indice} style={styles.item}><Text>Conteúdo vertical {indice + 1}</Text></View>
        ))}
        {/* scrollTo controla a posição por coordenadas. ?. evita chamar em uma ref nula. */}
        <Button title="Voltar ao início" onPress={() => rolagem.current?.scrollTo({ y: 0, animated: true })} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  rolagem: { flex: 1, marginTop: 12 },
  conteudo: { paddingBottom: 24 },
  faixa: { paddingVertical: 12 },
  cartao: { width: 140, height: 90, backgroundColor: '#bfdbfe', marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  item: { padding: 24, marginBottom: 8, backgroundColor: '#e2e8f0' },
});
