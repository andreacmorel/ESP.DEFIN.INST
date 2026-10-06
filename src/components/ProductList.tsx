import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { getProducts, searchProducts } from '../services/dummyJsonApi';
import type { Product } from '../types/product';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);

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

  async function loadMoreProducts() {
    if (loadingMore || search.trim() !== '') {
      return;
    }

    try {
      setLoadingMore(true);

      const moreProducts = await getProducts(
        20,
        products.length
      );

      setProducts((currentProducts) => [
        ...currentProducts,
        ...moreProducts,
      ]);
    } catch (err) {
      console.error(
        'Error al cargar más productos:',
        err
      );
    } finally {
      setLoadingMore(false);
    }
  }

  async function handleSearch() {
    try {
      setLoading(true);
      setError(null);

      if (search.trim() === '') {
        const data = await getProducts(20);
        setProducts(data);
      } else {
        const data = await searchProducts(
          search.trim()
        );
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
      setError(
        'No se pudieron buscar los productos.'
      );
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
        <Text style={styles.error}>
          {error}
        </Text>

        <Pressable
          style={styles.button}
          onPress={loadProducts}
        >
          <Text style={styles.buttonText}>
            Reintentar
          </Text>
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

        <Pressable
          style={styles.button}
          onPress={handleSearch}
        >
          <Text style={styles.buttonText}>
            Buscar
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) =>
          item.id.toString()
        }
        contentContainerStyle={styles.list}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" />
              <Text>
                Cargando más productos...
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <ProductCard product={item} />
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

  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
});