import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();

  const { email, logout } = useAuth();

  function handleProducts() {
    router.push('/products');
  }

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundCircle} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>P</Text>
            </View>

            <Text style={styles.brand}>
              PRODUCTAPP
            </Text>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>
              Salir
            </Text>
          </Pressable>
        </View>

        {/* BIENVENIDA */}
        <View style={styles.welcome}>
          <Text style={styles.hello}>
            Hola 👋
          </Text>

          <Text style={styles.email}>
            {email || 'usuario@productapp.com'}
          </Text>

          <Text style={styles.welcomeText}>
            ¿Qué querés explorar hoy?
          </Text>
        </View>

        {/* TARJETA PRINCIPAL */}
        <View style={styles.mainCard}>
          <View style={styles.mainIcon}>
            <Text style={styles.mainIconText}>
              🛍️
            </Text>
          </View>

          <Text style={styles.mainTitle}>
            Tu catálogo de productos
          </Text>

          <Text style={styles.mainDescription}>
            Explorá productos, consultá sus detalles y utilizá
            las herramientas disponibles para organizar el catálogo.
          </Text>

          <Pressable
            style={styles.mainButton}
            onPress={handleProducts}
          >
            <Text style={styles.mainButtonText}>
              Explorar catálogo
            </Text>

            <Text style={styles.mainButtonArrow}>
              →
            </Text>
          </Pressable>
        </View>

        {/* HERRAMIENTAS */}
        <Text style={styles.sectionTitle}>
          Herramientas disponibles
        </Text>

        <View style={styles.grid}>
          <Pressable
            style={styles.toolCard}
            onPress={handleProducts}
          >
            <Text style={styles.toolIcon}>
              🔎
            </Text>

            <Text style={styles.toolTitle}>
              Buscar
            </Text>

            <Text style={styles.toolText}>
              Encontrá productos por nombre.
            </Text>
          </Pressable>

          <Pressable
            style={styles.toolCard}
            onPress={handleProducts}
          >
            <Text style={styles.toolIcon}>
              ↕️
            </Text>

            <Text style={styles.toolTitle}>
              Ordenar
            </Text>

            <Text style={styles.toolText}>
              Organizá productos por precio.
            </Text>
          </Pressable>

          <Pressable
            style={styles.toolCard}
            onPress={handleProducts}
          >
            <Text style={styles.toolIcon}>
              🔄
            </Text>

            <Text style={styles.toolTitle}>
              Actualizar
            </Text>

            <Text style={styles.toolText}>
              Recargá el catálogo cuando quieras.
            </Text>
          </Pressable>

          <Pressable
            style={styles.toolCard}
            onPress={handleProducts}
          >
            <Text style={styles.toolIcon}>
              📦
            </Text>

            <Text style={styles.toolTitle}>
              Detalles
            </Text>

            <Text style={styles.toolText}>
              Consultá stock, precio y categoría.
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },

  backgroundCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#dbeafe',
    top: -150,
    right: -100,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 45,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 35,
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },

  brand: {
    color: '#1e3a8a',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1.3,
  },

  logoutButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },

  logoutText: {
    color: '#1d4ed8',
    fontWeight: '700',
  },

  welcome: {
    marginBottom: 24,
  },

  hello: {
    fontSize: 29,
    fontWeight: '900',
    color: '#0f172a',
  },

  email: {
    fontSize: 15,
    color: '#1d4ed8',
    fontWeight: '700',
    marginTop: 5,
  },

  welcomeText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
  },

  mainCard: {
    backgroundColor: '#1d4ed8',
    borderRadius: 24,
    padding: 23,
    marginBottom: 26,
  },

  mainIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  mainIconText: {
    fontSize: 25,
  },

  mainTitle: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '900',
    marginBottom: 9,
  },

  mainDescription: {
    color: '#dbeafe',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },

  mainButton: {
    backgroundColor: '#ffffff',
    height: 48,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainButtonText: {
    color: '#1d4ed8',
    fontSize: 15,
    fontWeight: '800',
  },

  mainButtonArrow: {
    color: '#1d4ed8',
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },

  toolCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  toolIcon: {
    fontSize: 23,
    marginBottom: 10,
  },

  toolTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },

  toolText: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 17,
  },
});