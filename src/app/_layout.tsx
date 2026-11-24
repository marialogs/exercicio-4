import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="exemplos"
        options={{ title: 'Exemplos' }}
      />

      <Stack.Screen
        name="exercicios"
        options={{ title: 'Exercícios' }}
      />
    </Stack>
  )
}
