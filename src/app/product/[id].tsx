import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getProductById } from '../../services/dummyJsonApi';
import type { Product } from '../../types/product';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);

        const productId = Number(id);
        const data = await getProductById(productId);

        setProduct(data);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el producto.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando producto...</Text>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error || 'Producto no encontrado.'}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{product.title}</Text>

        {product.brand && (
          <Text style={styles.brand}>
            Marca: {product.brand}
          </Text>
        )}

        <Text style={styles.category}>
          {product.category}
        </Text>

        <Text style={styles.price}>
          US$ {product.price.toFixed(2)}
        </Text>

        <Text style={styles.rating}>
          ⭐ {product.rating}
        </Text>

        <Text style={styles.stock}>
          Stock disponible: {product.stock}
        </Text>

        <Text style={styles.description}>
          {product.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },

  content: {
    padding: 20,
  },

  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },

  brand: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },

  category: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 15,
  },

  price: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },

  rating: {
    fontSize: 17,
    marginBottom: 8,
  },

  stock: {
    fontSize: 16,
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },

  error: {
    color: '#b91c1c',
    fontSize: 16,
    textAlign: 'center',
  },
});