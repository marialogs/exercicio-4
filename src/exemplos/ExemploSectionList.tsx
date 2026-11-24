import React, { useState } from 'react';
import { Button, SectionList, StyleSheet, Text, View } from 'react-native';

/** Lista virtualizada agrupada por seções. Uso: <ExemploSectionList />.
 * https://reactnative.dev/docs/sectionlist
 * Não aninhe em ScrollView vertical; a lista já faz a rolagem.
 */
type Alimento = { id: string; nome: string };
type Categoria = { key: string; titulo: string; data: Alimento[] };
// Cada seção precisa de data. titulo é um campo criado por nós, não uma prop nativa.
const SECOES: Categoria[] = [
  { key: 'frutas', titulo: 'Frutas', data: ['Maçã', 'Banana', 'Laranja', 'Uva', 'Pera', 'Manga'].map((nome, i) => ({ id: `f${i}`, nome })) },
  { key: 'laticinios', titulo: 'Laticínios', data: ['Leite', 'Queijo', 'Iogurte', 'Manteiga', 'Requeijão', 'Nata'].map((nome, i) => ({ id: `l${i}`, nome })) },
  { key: 'padaria', titulo: 'Padaria', data: ['Pão', 'Bolo', 'Cuca', 'Croissant', 'Biscoito', 'Torrada'].map((nome, i) => ({ id: `p${i}`, nome })) },
];

export default function ExemploSectionList() {
  const [vazia, setVazia] = useState(false);

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>SectionList: produtos por categoria</Text>
      <Button title={vazia ? 'Restaurar seções' : 'Esvaziar seções'} onPress={() => setVazia(valor => !valor)} />
      {/* sections recebe os grupos; renderItem desenha cada elemento de data.
          renderSectionHeader desenha o cabeçalho do grupo.
          renderSectionFooter desenha o rodapé de cada grupo.
          stickySectionHeadersEnabled fixa o cabeçalho durante a rolagem.
          keyExtractor identifica cada item de modo estável. */}
      <SectionList<Alimento, Categoria>
        style={styles.lista} sections={vazia ? [] : SECOES}
        keyExtractor={item => item.id} stickySectionHeadersEnabled
        contentContainerStyle={styles.conteudo}
        renderItem={({ item, index }) => (
          <View style={styles.item}><Text>{index + 1}. {item.nome}</Text></View>
        )}
        renderSectionHeader={({ section }) => <Text style={styles.cabecalho}>{section.titulo}</Text>}
        renderSectionFooter={({ section }) => <Text style={styles.rodape}>{section.data.length} produtos nesta categoria</Text>}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListHeaderComponent={<Text style={styles.rodape}>Role para observar os cabeçalhos fixos.</Text>}
        ListFooterComponent={<Text style={styles.rodape}>Fim das seções</Text>}
        // Aqui o botão usa sections=[] para demonstrar a lista realmente vazia.
        ListEmptyComponent={<Text style={styles.rodape}>Nenhuma categoria disponível.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  lista: { flex: 1, marginTop: 12 },
  conteudo: { paddingBottom: 24 },
  cabecalho: { padding: 16, fontWeight: 'bold', fontSize: 19, backgroundColor: '#bfdbfe', color: '#172554' },
  item: { padding: 22, backgroundColor: '#f1f5f9' },
  separador: { height: 1, backgroundColor: '#cbd5e1' },
  rodape: { paddingVertical: 16 },
});
