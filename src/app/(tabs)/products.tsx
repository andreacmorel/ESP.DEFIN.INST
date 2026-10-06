import ProductList from '@/components/ProductList';
import { addProduct, deleteProduct, updateProduct, } from '@/services/dummyJsonApi';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProductsScreen() {
  async function handleAddProduct() {
    try {
      const product = await addProduct('Producto de prueba', 100);

      Alert.alert(
        'Producto agregado',
        `Producto: ${product.title}\nPrecio: US$ ${product.price}`
      );

      console.log('Producto agregado:', product);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo agregar el producto.');
    }
  }

  async function handleUpdateProduct() {
    try {
      const product = await updateProduct(1, 'Producto modificado');

      Alert.alert(
        'Producto modificado',
        `ID: ${product.id}\nNuevo título: ${product.title}`
      );

      console.log('Producto modificado:', product);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo modificar el producto.');
    }
  }

  async function handleDeleteProduct() {
    try {
      const product = await deleteProduct(1);

      Alert.alert(
        'Producto eliminado',
        `ID: ${product.id}\nProducto: ${product.title}`
      );

      console.log('Producto eliminado:', product);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo eliminar el producto.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Productos</Text>

      <Pressable style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Agregar producto de prueba</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleUpdateProduct}>
        <Text style={styles.buttonText}>Modificar producto de prueba</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleDeleteProduct}>
        <Text style={styles.buttonText}>Eliminar producto de prueba</Text>
      </Pressable>

      <ProductList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  button: {
    backgroundColor: '#1d4ed8',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});