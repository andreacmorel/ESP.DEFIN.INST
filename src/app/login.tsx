import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    Keyboard.dismiss();

    if (email.trim() === '' || password.trim() === '') {
      Alert.alert(
        'Datos incompletos',
        'Ingresá tu correo electrónico y contraseña.'
      );
      return;
    }

    // Guardamos el correo en la sesión
    login(email.trim());

    // Vamos al Inicio
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundCircleOne} />
      <View style={styles.backgroundCircleTwo} />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* MARCA */}
            <View style={styles.brandContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>P</Text>
              </View>

              <Text style={styles.brand}>
                PRODUCTAPP
              </Text>
            </View>

            {/* PRESENTACIÓN */}
            <View style={styles.hero}>
              <Text style={styles.title}>
                Tu catálogo comienza acá.
              </Text>

              <Text style={styles.subtitle}>
                Descubrí, organizá y gestioná productos desde un solo lugar.
              </Text>
            </View>

            {/* FORMULARIO */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                Ingresá a tu catálogo
              </Text>

              <Text style={styles.cardSubtitle}>
                Completá tus datos para continuar.
              </Text>

              <View style={styles.form}>
                {/* EMAIL */}
                <View>
                  <Text style={styles.label}>
                    Correo electrónico
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                </View>

                {/* CONTRASEÑA */}
                <View>
                  <Text style={styles.label}>
                    Contraseña
                  </Text>

                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="••••••••"
                      placeholderTextColor="#9ca3af"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}
                    />

                    <Pressable
                      style={styles.eyeButton}
                      onPress={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      <Text style={styles.eyeText}>
                        {showPassword ? 'Ocultar' : 'Ver'}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                {/* BOTÓN LOGIN */}
                <Pressable
                  style={styles.loginButton}
                  onPress={handleLogin}
                >
                  <Text style={styles.loginButtonText}>
                    Ingresar
                  </Text>

                  <Text style={styles.arrow}>
                    →
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* ESTADO */}
            <View style={styles.footer}>
              <View style={styles.statusDot} />

              <Text style={styles.footerText}>
                Catálogo conectado con DummyJSON
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff',
    overflow: 'hidden',
  },

  keyboardView: {
    flex: 1,
  },

  backgroundCircleOne: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#dbeafe',
    top: -90,
    right: -100,
  },

  backgroundCircleTwo: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#dbeafe',
    bottom: -70,
    left: -80,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: 'center',
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 38,
  },

  logo: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  logoText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },

  brand: {
    color: '#1e3a8a',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  hero: {
    marginBottom: 28,
  },

  title: {
    fontSize: 35,
    lineHeight: 42,
    fontWeight: '900',
    color: '#0f172a',
    maxWidth: 320,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 23,
    color: '#64748b',
    maxWidth: 330,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#dbeafe',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0f172a',
  },

  cardSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 5,
    marginBottom: 24,
  },

  form: {
    gap: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },

  input: {
    height: 55,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 13,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#0f172a',
  },

  passwordContainer: {
    height: 55,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#0f172a',
  },

  eyeButton: {
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
  },

  eyeText: {
    color: '#1d4ed8',
    fontSize: 13,
    fontWeight: '800',
  },

  loginButton: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#1d4ed8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },

  arrow: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 8,
  },

  footerText: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
  },
});