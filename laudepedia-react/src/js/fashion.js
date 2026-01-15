// FashionLogic.js

export const filterAndSortProducts = (products, searchTerm, sortType) => {
  let filtered = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortType === 'low') {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (sortType === 'high') {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  }

  return filtered;
};

// Variabel delay untuk animasi staggered
export const getStaggerDelay = (index) => ({
  animationDelay: `${index * 0.1}s`
});