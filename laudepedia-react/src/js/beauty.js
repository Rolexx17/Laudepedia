export const getProcessedBeauty = (products, searchTerm, sortType) => {
  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortType === 'low') {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (sortType === 'high') {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  }
  return filtered;
};

export const animationSettings = (index) => ({
  transitionDelay: `${index * 80}ms`,
});