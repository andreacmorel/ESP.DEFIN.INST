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

export async function addProduct(title: string, price: number) {
  const response = await fetch(`${BASE_URL}/products/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, price }),
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}

export async function updateProduct(id: number, title: string) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}

export async function deleteProduct(id: number) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }

  return response.json();
}