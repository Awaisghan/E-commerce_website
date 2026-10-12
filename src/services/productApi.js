/**
 * Product API Service interfacing with DummyJSON Products API
 * https://dummyjson.com/products
 */

const BASE_URL = 'https://dummyjson.com/products';

export const CATEGORY_MAPPINGS = {
  'electronics': {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Explore high-performance laptops, cutting-edge smartphones, and smart devices for modern life.',
    bannerImg: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1400&auto=format&fit=crop',
    subCategories: ['laptops', 'smartphones', 'tablets', 'mobile-accessories']
  },
  'fashion': {
    name: 'Fashion',
    slug: 'fashion',
    description: 'Timeless apparel and elevated essentials crafted with sustainable sensibilities.',
    bannerImg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400&auto=format&fit=crop',
    subCategories: ['mens-shirts', 'womens-dresses', 'tops', 'mens-shoes', 'womens-shoes']
  },
  'mens-clothing': {
    name: "Men's Clothing",
    slug: 'mens-clothing',
    description: 'Refined shirts, tailored wardrobe staples, and footwear designed for comfort and poise.',
    bannerImg: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1400&auto=format&fit=crop',
    subCategories: ['mens-shirts', 'mens-shoes']
  },
  'womens-clothing': {
    name: "Women's Clothing",
    slug: 'womens-clothing',
    description: 'Effortless dresses, elevated tops, and footwear designed for versatile modern styling.',
    bannerImg: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop',
    subCategories: ['womens-dresses', 'womens-shoes', 'tops']
  },
  'accessories': {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Statement watches, leather goods, minimalist jewelry, and contemporary sunglasses.',
    bannerImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop',
    subCategories: ['mens-watches', 'womens-watches', 'womens-bags', 'womens-jewellery', 'sunglasses', 'sports-accessories']
  },
  'home-living': {
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Transform your sanctuaries with artisanal decor, ergonomic furniture, and kitchen craft.',
    bannerImg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop',
    subCategories: ['furniture', 'home-decoration', 'kitchen-accessories']
  },
  'beauty-personal-care': {
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Organic skincare, captivating fragrances, and premium clean cosmetics.',
    bannerImg: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1400&auto=format&fit=crop',
    subCategories: ['beauty', 'fragrances', 'skin-care']
  }
};

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop';

/**
 * Fetch all products or paginate
 */
export const getProducts = async ({ limit = 20, skip = 0, sortBy, order } = {}) => {
  try {
    let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
    if (sortBy) {
      url += `&sortBy=${sortBy}&order=${order || 'asc'}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch product by ID
 */
export const getProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Product not found (status ${res.status})`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Search products with query
 */
export const searchProducts = async (query, { limit = 30, skip = 0 } = {}) => {
  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error(`Search failed (status ${res.status})`);
    return await res.json();
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

/**
 * Fetch products by category slug (supports mapped umbrella categories or direct subcategory slugs)
 */
export const getProductsByCategory = async (categorySlug, { limit = 24, skip = 0 } = {}) => {
  try {
    const mapping = CATEGORY_MAPPINGS[categorySlug];
    if (mapping && mapping.subCategories) {
      // Fetch concurrently from all matching subcategories
      const promises = mapping.subCategories.map(sub => 
        fetch(`${BASE_URL}/category/${sub}?limit=20`)
          .then(r => r.ok ? r.json() : { products: [] })
          .catch(() => ({ products: [] }))
      );
      const results = await Promise.all(promises);
      let combined = [];
      results.forEach(res => {
        if (res && res.products) {
          combined.push(...res.products);
        }
      });
      // Deduplicate by ID
      const seen = new Set();
      const uniqueProducts = combined.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });

      return {
        products: uniqueProducts.slice(skip, skip + limit),
        total: uniqueProducts.length,
        skip,
        limit,
        categoryMeta: mapping
      };
    }

    // Direct single dummyjson category slug
    const res = await fetch(`${BASE_URL}/category/${categorySlug}?limit=${limit}&skip=${skip}`);
    if (!res.ok) {
      // Fallback search if category endpoint differs
      return await searchProducts(categorySlug, { limit, skip });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching category products for ${categorySlug}:`, error);
    throw error;
  }
};

/**
 * Fetch all categories from API
 */
export const getCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
