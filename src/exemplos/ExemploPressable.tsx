import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

/** Área de toque personalizável. Uso: <ExemploPressable />.
 * https://reactnative.dev/docs/pressable
 */
export default function ExemploPressable() {
  const [desabilitado, setDesabilitado] = useState(false);
  const [eventos, setEventos] = useState<string[]>([]);

  // Mantém os últimos seis eventos para observar a ordem dos callbacks.
  function registrar(evento: string) {
    setEventos(anteriores => [...anteriores, evento].slice(-6));
  }

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Pressable: toque curto e longo</Text>
      <View style={styles.linha}>
        <Text>Desabilitar</Text>
        <Switch value={desabilitado} onValueChange={setDesabilitado} accessibilityLabel="Desabilitar área de toque" />
      </View>
      {/* onPressIn: início; onPressOut: fim da pressão; onPress: toque concluído.
          onLongPress: pressão prolongada; delayLongPress define o tempo em ms.
          disabled bloqueia interação; hitSlop amplia a área sem ampliar o desenho
          (a área ampliada continua limitada pelos limites do pai).
          android_ripple adiciona o efeito de onda somente no Android. */}
      <Pressable
        disabled={desabilitado} hitSlop={8} delayLongPress={700}
        onPressIn={() => registrar('onPressIn')}
        onPressOut={() => registrar('onPressOut')}
        onPress={() => registrar('onPress')}
        onLongPress={() => registrar('onLongPress')}
        android_ripple={{ color: '#93c5fd' }}
        accessibilityRole="button" accessibilityLabel="Área de teste de toque"
        accessibilityState={{ disabled: desabilitado }}
        // A função de style recebe pressed e muda o visual enquanto o dedo pressiona.
        style={({ pressed }) => [styles.botao, pressed && styles.pressionado, desabilitado && styles.desabilitado]}
      >
        {({ pressed }) => <Text style={styles.rotulo}>{pressed ? 'Pressionando...' : 'Toque ou segure por 700 ms'}</Text>}
      </Pressable>
      <Text>Eventos (do mais antigo ao mais recente):</Text>
      <Text style={styles.eventos}>{eventos.join('\n') || 'Nenhum evento ainda.'}</Text>
      <Text>Faça um toque curto e depois segure. Compare as sequências.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  botao: { padding: 24, backgroundColor: '#1d4ed8', borderRadius: 12, marginVertical: 20 },
  pressionado: { backgroundColor: '#172554' },
  desabilitado: { opacity: 0.4 },
  rotulo: { color: '#fff', textAlign: 'center', fontSize: 17 },
  eventos: { marginVertical: 16, lineHeight: 24 },
});
