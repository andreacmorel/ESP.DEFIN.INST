import type { Product, ProductsResponse } from '../types/product';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error(
    'Falta EXPO_PUBLIC_API_URL. Revisá el archivo .env en la raíz del proyecto.'
  );
}

export async function getProducts(
  limit: number = 12,
  skip: number = 0
): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data: ProductsResponse = await response.json();
  return data.products;
}

export async function searchProducts(
  query: string
): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  const data: ProductsResponse = await response.json();
  return data.products;
}

export async function getProductById(
  id: number
): Promise<Product> {
  const response = await fetch(
    `${BASE_URL}/products/${id}`
  );

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}