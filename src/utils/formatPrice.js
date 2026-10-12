/**
 * Currency and pricing formatting helpers
 */

export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const calculateDiscountPrice = (price, discountPercentage) => {
  if (!discountPercentage || discountPercentage <= 0) return price;
  const original = price / (1 - discountPercentage / 100);
  return original;
};

export const formatRating = (rating) => {
  if (typeof rating !== 'number') return '4.5';
  return rating.toFixed(1);
};
