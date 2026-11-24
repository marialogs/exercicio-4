import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

/** Entrada booleana controlada. Uso: <ExemploSwitch />.
 * https://reactnative.dev/docs/switch
 */
export default function ExemploSwitch() {
  const [notificacoes, setNotificacoes] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Switch: ligado ou desligado</Text>
      <View style={styles.linha}>
        <Text>Bloquear a opção abaixo</Text>
        <Switch value={bloqueado} onValueChange={setBloqueado} accessibilityLabel="Bloquear opção de notificações" />
      </View>
      {/* value é boolean; onValueChange recebe o novo boolean.
          O Switch é controlado: sem atualizar value, a mudança não é mantida.
          disabled impede alterações; trackColor define as cores da trilha.
          thumbColor é a cor do círculo (remove sua sombra no iOS).
          ios_backgroundColor configura o fundo exposto no iOS. */}
      <View style={styles.linha}>
        <Text>Receber notificações</Text>
        <Switch
          value={notificacoes} onValueChange={setNotificacoes} disabled={bloqueado}
          trackColor={{ false: '#94a3b8', true: '#16a34a' }}
          thumbColor={notificacoes ? '#f0fdf4' : '#f1f5f9'}
          ios_backgroundColor="#94a3b8" accessibilityLabel="Receber notificações"
        />
      </View>
      <Text>Valor no estado: {String(notificacoes)}</Text>
      <Text style={styles.resumo}>{notificacoes ? 'Notificações ativadas.' : 'Notificações desativadas.'}</Text>
      <Text>Este exemplo altera somente a interface; não solicita permissão nem envia notificações.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap' },
  resumo: { fontSize: 18, marginVertical: 16 },
});
