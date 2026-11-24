import ExemploCondicional from '@/components/ExemploCondicional';
import ExercicioTextInput from '@/components/ExercicioTextInput';
import { useState } from 'react';
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ExemploActivityIndicator from '../exemplos/ExemploActivityIndicator';
import ExemploButton from '../exemplos/ExemploButton';
import ExemploFlatList from '../exemplos/ExemploFlatList';
import ExemploImage from '../exemplos/ExemploImage';
import ExemploKeyboardAvoidingView from '../exemplos/ExemploKeyboardAvoidingView';
import ExemploPressable from '../exemplos/ExemploPressable';
import ExemploScrollView from '../exemplos/ExemploScrollView';
import ExemploSectionList from '../exemplos/ExemploSectionList';
import ExemploStatusBar from '../exemplos/ExemploStatusBar';
import ExemploSwitch from '../exemplos/ExemploSwitch';
import ExemploText from '../exemplos/ExemploText';
import ExemploTextInput from '../exemplos/ExemploTextInput';
import ExemploView from '../exemplos/ExemploView';

// Cada exemplo tem export default e pode ser importado/instanciado isoladamente.
const EXEMPLOS = [
  { nome: 'Exemplo TextInput', Componente: ExercicioTextInput }, 
  { nome: 'Exemplo Condicional', Componente: ExemploCondicional }, 
  { nome: 'Text', Componente: ExemploText },
  { nome: 'TextInput', Componente: ExemploTextInput },
  { nome: 'View', Componente: ExemploView },
  { nome: 'ScrollView', Componente: ExemploScrollView },
  { nome: 'Button', Componente: ExemploButton },
  { nome: 'Pressable', Componente: ExemploPressable },
  { nome: 'Switch', Componente: ExemploSwitch },
  { nome: 'Image', Componente: ExemploImage },
  { nome: 'FlatList', Componente: ExemploFlatList },
  { nome: 'SectionList', Componente: ExemploSectionList },
  { nome: 'ActivityIndicator', Componente: ExemploActivityIndicator },
  { nome: 'StatusBar', Componente: ExemploStatusBar },
  { nome: 'KeyboardAvoidingView', Componente: ExemploKeyboardAvoidingView },
];

function Galeria() {
  const [indice, setIndice] = useState(0);
  const [alturaCabecalho, setAlturaCabecalho] = useState(0);
  const insets = useSafeAreaInsets();
  const { nome, Componente } = EXEMPLOS[indice];

  return (
    <SafeAreaView style={styles.tela}>
      <View onLayout={evento => setAlturaCabecalho(evento.nativeEvent.layout.height)}>
        <Text style={styles.titulo}>Exemplos Componentes Básicos</Text>
        <Text style={styles.dica}>Deslize o menu e selecione um exemplo.</Text>
        {/* Só o menu rola na horizontal. A área do exemplo é uma View com flex: 1,
            evitando aninhar FlatList/SectionList em ScrollView vertical. */}
        <ScrollView horizontal style={styles.menu} contentContainerStyle={styles.opcoes}>
          {EXEMPLOS.map((exemplo, posicao) => (
            <Pressable
              key={exemplo.nome} accessibilityRole="button"
              accessibilityState={{ selected: posicao === indice }}
              style={[styles.opcao, posicao === indice && styles.ativa]}
              onPress={() => { Keyboard.dismiss(); setIndice(posicao); }}
            >
              <Text style={posicao === indice ? styles.textoAtivo : styles.textoOpcao}>{exemplo.nome}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={styles.exemplo}>
        {/* key reinicia o estado ao trocar de exemplo. O de teclado recebe o
            deslocamento do cabeçalho e da área segura, medidos nesta tela.
            Se o navegador adicionar outro cabeçalho, considere sua altura também. */}
        {nome === 'KeyboardAvoidingView' ? (
          <ExemploKeyboardAvoidingView key={nome} keyboardVerticalOffset={alturaCabecalho + insets.top} />
        ) : <Componente key={nome} />}
      </View>
    </SafeAreaView>
  );
}

export default function Exmeplos() {
  // Em um projeto que já tenha SafeAreaProvider no layout raiz, reutilize-o.
  return <SafeAreaProvider><Galeria /></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f8fafc' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#172554', paddingHorizontal: 16, paddingTop: 12 },
  dica: { paddingHorizontal: 16, paddingTop: 6, color: '#334155' },
  menu: { height: 64, flexGrow: 0 },
  opcoes: { alignItems: 'center', paddingHorizontal: 12 },
  opcao: { borderRadius: 8, padding: 12, marginRight: 8, backgroundColor: '#e2e8f0' },
  ativa: { backgroundColor: '#1d4ed8' },
  textoAtivo: { color: '#fff', fontWeight: 'bold' },
  textoOpcao: { color: '#172554' },
  exemplo: { flex: 1, borderTopWidth: 1, borderTopColor: '#cbd5e1' },
});
