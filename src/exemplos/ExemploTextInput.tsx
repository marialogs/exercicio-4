import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';

/** Entrada de dados pelo teclado. Uso: <ExemploTextInput />.
 * https://reactnative.dev/docs/textinput
 */
export default function ExemploTextInput() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idade, setIdade] = useState('');
  const [observacao, setObservacao] = useState('');
  const [mensagem, setMensagem] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>TextInput: formulário controlado</Text>
      <Text>Nome (até 30 caracteres)</Text>
      {/* value recebe o estado; onChangeText recebe a nova string e atualiza o estado.
          placeholder é uma dica quando vazio; maxLength limita o tamanho.
          autoCapitalize="words" sugere iniciais maiúsculas.
          returnKeyType muda a tecla de ação; onSubmitEditing trata essa ação. */}
      <TextInput
        style={styles.campo} value={nome} onChangeText={setNome}
        placeholder="Digite seu nome" placeholderTextColor="#64748b"
        maxLength={30} autoCapitalize="words" returnKeyType="done"
        accessibilityLabel="Nome"
        onSubmitEditing={() => setMensagem(`Olá, ${nome || 'estudante'}!`)}
      />
      <Text>E-mail</Text>
      {/* keyboardType sugere um teclado, mas não valida o conteúdo digitado. */}
      <TextInput
        style={styles.campo} value={email} onChangeText={setEmail}
        placeholder="aluno@exemplo.com" keyboardType="email-address"
        autoCapitalize="none" autoCorrect={false} accessibilityLabel="E-mail"
      />
      <Text>Senha de demonstração</Text>
      {/* secureTextEntry oculta caracteres; não criptografa nem armazena a senha. */}
      <TextInput
        style={styles.campo} value={senha} onChangeText={setSenha}
        secureTextEntry autoCapitalize="none" autoCorrect={false}
        placeholder="Digite uma senha fictícia" accessibilityLabel="Senha"
      />
      <Text>Idade (o estado continua sendo string)</Text>
      <TextInput
        style={styles.campo} value={idade} onChangeText={setIdade}
        keyboardType="number-pad" placeholder="Ex.: 18" accessibilityLabel="Idade"
      />
      <Text>Observações</Text>
      {/* multiline permite quebras de linha. minHeight garante espaço visual;
          textAlignVertical="top" alinha o conteúdo no Android. */}
      <TextInput
        style={[styles.campo, styles.multilinha]} value={observacao}
        onChangeText={setObservacao} multiline maxLength={200}
        placeholder="Escreva em várias linhas" accessibilityLabel="Observações"
      />
      {/* editable={false} apresenta um campo que não pode ser alterado. */}
      <TextInput style={styles.campo} value="Campo somente leitura" editable={false} accessibilityLabel="Somente leitura" />
      <Text>Prévia: {nome || '(sem nome)'} | {email || '(sem e-mail)'} | Idade: {idade || '-'}</Text>
      <Text>{observacao.length}/200 caracteres nas observações.</Text>
      <Text>{mensagem}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  campo: { borderWidth: 1, borderColor: '#64748b', borderRadius: 8, padding: 12, marginTop: 4, marginBottom: 16, color: '#111827', backgroundColor: '#fff' },
  multilinha: { minHeight: 110, textAlignVertical: 'top' },
});
