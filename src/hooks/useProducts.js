import { useState, useEffect, useCallback } from 'react';
import { getProducts, getProductsByCategory, searchProducts } from '../services/productApi';

export const useProducts = ({
  category = null,
  searchQuery = '',
  limit = 20,
  skip = 0,
  initialSort = 'default'
} = {}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryMeta, setCategoryMeta] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (searchQuery && searchQuery.trim() !== '') {
        data = await searchProducts(searchQuery, { limit, skip });
      } else if (category && category !== 'all') {
        data = await getProductsByCategory(category, { limit, skip });
      } else {
        data = await getProducts({ limit, skip });
      }

      if (data && data.products) {
        setProducts(data.products);
        setTotal(data.total || data.products.length);
        if (data.categoryMeta) {
          setCategoryMeta(data.categoryMeta);
        } else {
          setCategoryMeta(null);
        }
      } else {
        setProducts([]);
        setTotal(0);
      }
    } catch (err) {
      console.error('Fetch error in useProducts:', err);
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery, limit, skip]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    total,
    loading,
    error,
    categoryMeta,
    refetch: fetchProducts
  };
};
