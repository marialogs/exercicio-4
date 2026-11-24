import React, { useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

/** Lista virtualizada: renderiza uma janela de itens. Uso: <ExemploFlatList />.
 * https://reactnative.dev/docs/flatlist
 * Não envolva esta tela em ScrollView vertical: a lista já possui rolagem.
 */
type Produto = { id: string; nome: string; preco: number };
const PRODUTOS: Produto[] = Array.from({ length: 40 }, (_, indice) => ({
  id: String(indice + 1), nome: `Produto ${indice + 1}`, preco: (indice + 1) * 2.5,
}));

export default function ExemploFlatList() {
  const [vazia, setVazia] = useState(false);
  const [selecionado, setSelecionado] = useState<string | null>(null);

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>FlatList: catálogo selecionável</Text>
      <Button title={vazia ? 'Restaurar itens' : 'Esvaziar lista'} onPress={() => {
        setVazia(valor => !valor);
        setSelecionado(null);
      }} />
      {/* data é o array; renderItem recebe { item, index, separators }.
          keyExtractor produz uma chave estável: use o ID, evitando o índice.
          extraData informa que a aparência depende também do estado selecionado.
          initialNumToRender define quantos itens renderizar inicialmente.
          contentContainerStyle aplica espaçamento no conteúdo interno. */}
      <FlatList<Produto>
        style={styles.lista} data={vazia ? [] : PRODUTOS}
        keyExtractor={item => item.id} extraData={selecionado}
        initialNumToRender={10} contentContainerStyle={styles.conteudo}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelecionado(item.id)}
            accessibilityRole="button" accessibilityState={{ selected: selecionado === item.id }}
            style={[styles.item, selecionado === item.id && styles.selecionado]}
          >
            <Text>{item.nome}</Text><Text>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
          </Pressable>
        )}
        // Estes componentes são renderizados antes, entre e depois dos itens.
        ListHeaderComponent={<Text style={styles.aviso}>Toque para selecionar. ID: {selecionado ?? 'nenhum'}</Text>}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListFooterComponent={<Text style={styles.aviso}>Fim do catálogo</Text>}
        // Aparece quando data não contém itens; teste pelo botão acima.
        ListEmptyComponent={<Text style={styles.aviso}>Nenhum produto encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  lista: { flex: 1, marginTop: 12 },
  conteudo: { paddingBottom: 24 },
  item: { padding: 20, backgroundColor: '#e2e8f0', borderRadius: 8 },
  selecionado: { backgroundColor: '#bfdbfe' },
  separador: { height: 8 },
  aviso: { paddingVertical: 16 },
});
