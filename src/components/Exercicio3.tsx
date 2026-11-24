import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

type Erros = {
  nome?: boolean;
  email?: boolean;
  senha?: boolean;
  confirmarSenha?: boolean;
};

export default function Exercicio3() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<Erros>({});

  function validarCampos(): Erros {
    const novosErros: Erros = {};

    if (nome.trim() === "") {
      novosErros.nome = true;
    }

    if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = true;
    }

    if (senha.trim().length < 6) {
      novosErros.senha = true;
    }

    if (confirmarSenha.trim().length < 6 || senha !== confirmarSenha) {
      novosErros.confirmarSenha = true;
    }

    return novosErros;
  }

  function cadastrar() {
    const novosErros = validarCampos();
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      setMensagem(
        novosErros.confirmarSenha && senha !== confirmarSenha
          ? "As senhas não conferem"
          : "Preencha os campos destacados"
      );
      return;
    }

    setMensagem("");
    Alert.alert("Campos válidos, irá cadastrar...");
  }

  // Ao digitar em qualquer campo, limpa todos os erros
  function digitar(setter: (valor: string) => void) {
    return (valor: string) => {
      setter(valor);
      setErros({});
      setMensagem("");
    };
  }

  return (
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput
        style={[styles.campo_texto, erros.nome && styles.erro]}
        value={nome}
        onChangeText={digitar(setNome)}
      />

      <Text>E-mail</Text>
      <TextInput
        style={[styles.campo_texto, erros.email && styles.erro]}
        value={email}
        onChangeText={digitar(setEmail)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Senha</Text>
      <View style={[styles.painel_senha, erros.senha && styles.erro]}>
        <TextInput
          style={styles.campo_senha}
          value={senha}
          onChangeText={digitar(setSenha)}
          secureTextEntry={!mostrarSenha}
        />
        <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Text style={styles.olho}>{mostrarSenha ? "🙈" : "👁️"}</Text>
        </Pressable>
      </View>

      <Text>Confirmar senha</Text>
      <View style={[styles.painel_senha, erros.confirmarSenha && styles.erro]}>
        <TextInput
          style={styles.campo_senha}
          value={confirmarSenha}
          onChangeText={digitar(setConfirmarSenha)}
          secureTextEntry={!mostrarSenha}
        />
        <Pressable onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Text style={styles.olho}>{mostrarSenha ? "🙈" : "👁️"}</Text>
        </Pressable>
      </View>

      <View style={styles.botao}>
        <Button title="Cadastrar" onPress={cadastrar} />
      </View>

      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  campo_texto: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  painel_senha: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 10,
  },
  campo_senha: {
    flex: 1,
    padding: 8,
  },
  olho: {
    fontSize: 22,
    paddingHorizontal: 10,
  },
  botao: {
    marginVertical: 10,
  },
  mensagem: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
  erro: {
    borderColor: "red",
    borderWidth: 2,
  },
});