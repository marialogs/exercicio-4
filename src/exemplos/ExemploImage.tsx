import { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text } from 'react-native';

/** Imagens locais e remotas. Uso: <ExemploImage />.
 * https://reactnative.dev/docs/image
 */
export default function ExemploImage() {
  const [modo, setModo] = useState<'contain' | 'cover'>('contain');
  const [situacao, setSituacao] = useState('Aguardando carregamento.');

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Image: origem e dimensionamento</Text>
      {/* require usa caminho estático, relativo a este arquivo, e inclui a imagem no app.
          O arquivo acompanha este material e funciona sem internet. */}
      <Image
        source={require('../../assets/exemplo.png')}
        style={styles.local} resizeMode="contain"
        accessible accessibilityLabel="Imagem local: três faixas coloridas"
      />
      <Text>Imagem local incluída no material.</Text>
      {/* source={{ uri }} aponta para uma URL; imagens remotas precisam de dimensões.
          contain mostra a imagem inteira; cover preenche o quadro e pode cortar bordas.
          onLoadStart avisa o início, onLoad o sucesso e onError a falha.
          onLoadEnd também existe e é chamado tanto no sucesso quanto na falha. */}
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.remota} resizeMode={modo}
        onLoadStart={() => setSituacao('Carregando imagem remota...')}
        onLoad={() => setSituacao('Imagem remota carregada!')}
        onError={() => setSituacao('Falha ao carregar: confira a internet ou troque a URL.')}
        accessible accessibilityLabel="Logotipo remoto do React Native"
      />
      <Text style={styles.texto}>{situacao}</Text>
      <Button title={`Modo: ${modo}. Alternar`} onPress={() => setModo(anterior => anterior === 'contain' ? 'cover' : 'contain')} />
      <Text style={styles.texto}>Compare as bordas do logotipo. A imagem remota exige acesso à internet.</Text>
      {/* Outros modos: stretch (distorce), center (centraliza) e repeat (repete).
          Para exercitar onError, troque a URL por um endereço inexistente. */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  local: { width: 240, height: 100, backgroundColor: '#e2e8f0' },
  remota: { width: 240, height: 130, backgroundColor: '#e2e8f0', marginTop: 20 },
  texto: { marginVertical: 16, fontSize: 16 },
});
