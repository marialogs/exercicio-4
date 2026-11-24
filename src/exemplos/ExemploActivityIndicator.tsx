import React, { useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

/** Indicador circular de atividade. Uso: <ExemploActivityIndicator />.
 * https://reactnative.dev/docs/activityindicator
 */
export default function ExemploActivityIndicator() {
  const [carregando, setCarregando] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>ActivityIndicator: atividade em andamento</Text>
      {/* size aceita small ou large em ambas as plataformas; número é específico do Android.
          color define a cor do indicador; animating controla a atividade/exibição.
          hidesWhenStopped é específico do iOS e oculta o indicador parado. */}
      <View style={styles.linha}>
        <ActivityIndicator size="small" color="#1d4ed8" animating={carregando} hidesWhenStopped />
        <ActivityIndicator size="large" color="#15803d" animating={carregando} hidesWhenStopped />
      </View>
      <Text style={styles.texto}>{carregando ? 'Carregando...' : 'Carregamento concluído.'}</Text>
      <Button title={carregando ? 'Concluir carregamento' : 'Iniciar novamente'} onPress={() => setCarregando(valor => !valor)} />
      {/* Renderização condicional remove o componente da árvore quando false,
          garantindo ausência do indicador e de seu espaço em ambas as plataformas. */}
      {carregando && (
        <View style={styles.cartao}>
          <ActivityIndicator size="large" color="#7e22ce" />
          <Text style={styles.texto}>Este cartão inteiro desaparece ao concluir.</Text>
        </View>
      )}
      <Text style={styles.texto}>A operação é controlada pelo botão: não há requisição real. O círculo não indica uma porcentagem de progresso.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  linha: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 80 },
  texto: { fontSize: 16, marginVertical: 16 },
  cartao: { padding: 20, marginTop: 20, backgroundColor: '#ede9fe', borderRadius: 8 },
});
