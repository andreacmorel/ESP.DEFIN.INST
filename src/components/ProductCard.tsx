import { useRouter } from 'expo-router';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { Product } from '../types/product';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        router.push(`/product/${product.id}`);
      }}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text style={styles.title}>
          {product.title}
        </Text>

        <Text style={styles.category}>
          {product.category}
        </Text>

        {product.brand && (
          <Text style={styles.brand}>
            Marca: {product.brand}
          </Text>
        )}

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {product.description}
        </Text>

        <Text style={styles.price}>
          US$ {product.price.toFixed(2)}
        </Text>

        <Text>
          ⭐ {product.rating} · Stock: {product.stock}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
});