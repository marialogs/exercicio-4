import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';

/** Controla a barra do SISTEMA (relógio/bateria), sem ocupar espaço no layout.
 * Uso: <ExemploStatusBar />. https://reactnative.dev/docs/statusbar
 */
export default function ExemploStatusBar() {
  const [iconesClaros, setIconesClaros] = useState(false);
  const [oculta, setOculta] = useState(false);

  return (
    <View style={[styles.tela, { backgroundColor: iconesClaros ? '#172554' : '#f8fafc' }]}>
      {/* barStyle altera texto/ícones, não o fundo: light-content ou dark-content.
          hidden oculta a barra; animated anima mudanças suportadas.
          showHideTransition escolhe a transição de visibilidade no iOS.
          O efeito real deve ser observado no Android/iOS, não no navegador.
          As props backgroundColor/translucent não são usadas: no Android moderno
          com edge-to-edge não controlam a barra como nas versões antigas.
          Múltiplos StatusBar montados combinam props pela ordem de montagem;
          evite outros controladores concorrentes na tela de teste. */}
      <StatusBar
        barStyle={iconesClaros ? 'light-content' : 'dark-content'}
        hidden={oculta} animated showHideTransition="fade"
      />
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.cartao}>
          <Text style={styles.titulo}>StatusBar: observe o topo do celular</Text>
          <View style={styles.linha}>
            <Text>Usar ícones claros</Text>
            <Switch value={iconesClaros} onValueChange={setIconesClaros} accessibilityLabel="Usar ícones claros na barra do sistema" />
          </View>
          <View style={styles.linha}>
            <Text>Ocultar barra</Text>
            <Switch value={oculta} onValueChange={setOculta} accessibilityLabel="Ocultar barra do sistema" />
          </View>
          <Text>Estilo: {iconesClaros ? 'light-content' : 'dark-content'}</Text>
          <Text style={styles.texto}>Em edge-to-edge, o fundo visível atrás da barra vem da tela. Este componente muda seu próprio fundo; o fundo do cabeçalho da galeria é controlado pelo index.</Text>
          <Text>Teste também isoladamente, ocupando toda a tela. A integração de área segura e as configurações nativas podem alterar o resultado.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1 },
  conteudo: { padding: 20 },
  cartao: { padding: 16, backgroundColor: '#fff', borderRadius: 8 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#172554' },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap' },
  texto: { marginVertical: 16, color: '#1f2937' },
});
