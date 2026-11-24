import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  function navegarExercicios(){
    router.navigate('/exercicios')
  }

  function navegarExemplos(){
    router.navigate('/exemplos')
  }

  return (
    <View style={styles.tela}>
      <View>
        <Text style={styles.titulo}>Aplicativo da Aula de Dispositivos Móveis</Text>
      </View>
      <View style={styles.corpo}>
        <Pressable
          onPress={navegarExercicios}>
          <View style={styles.botao}>
            <Text style={styles.texto_botao}>Exercícios</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={navegarExemplos}>
          <View style={styles.botao}>
            <Text style={styles.texto_botao}>Exemplos</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tela: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#172554', 
    paddingHorizontal: 16, 
    paddingTop: 12 
  },
  corpo: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  botao: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 5
  },
  texto_botao: {
    color: 'white',
    fontSize: 20
  },
});
