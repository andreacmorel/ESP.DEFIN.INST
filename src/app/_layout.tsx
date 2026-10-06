import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthProvider } from '@/context/AuthContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider
        value={
          colorScheme === 'dark'
            ? DarkTheme
            : DefaultTheme
        }
      >
        <AnimatedSplashOverlay />

        <Stack initialRouteName="login">
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="product/[id]"
            options={{
              title: 'Detalle',
            }}
          />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}