import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { getProducts, searchProducts } from '../services/dummyJsonApi';
import type { Product } from '../types/product';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProducts(20);
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  }, []);

  async function handleSearch() {
    try {
      setLoading(true);
      setError(null);

      if (search.trim() === '') {
        const data = await getProducts(20);
        setProducts(data);
      } else {
        const data = await searchProducts(search.trim());
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
      setError('No se pudieron buscar los productos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>

        <Pressable style={styles.button} onPress={loadProducts}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar producto..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />

        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/product/[id]',
                params: { id: item.id.toString() },
              })
            }
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.image}
              resizeMode="contain"
            />

            <View style={styles.info}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.category}>
                {item.category}
              </Text>

              {item.brand && (
                <Text style={styles.brand}>
                  Marca: {item.brand}
                </Text>
              )}

              <Text
                style={styles.description}
                numberOfLines={2}
              >
                {item.description}
              </Text>

              <Text style={styles.price}>
                US$ {item.price.toFixed(2)}
              </Text>

              <Text>
                ⭐ {item.rating} · Stock: {item.stock}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },

  list: {
    padding: 16,
    gap: 12,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  image: {
    width: 100,
    height: 100,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
  },

  info: {
    flex: 1,
    gap: 4,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },

  category: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#6b7280',
  },

  brand: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },

  description: {
    color: '#4b5563',
  },

  price: {
    fontSize: 17,
    fontWeight: '700',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },

  error: {
    color: '#b91c1c',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#1d4ed8',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});