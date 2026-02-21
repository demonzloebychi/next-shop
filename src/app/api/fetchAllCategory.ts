
export const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');

  const data = await response.json();
  return data as string[];
}