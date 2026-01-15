import { useState } from 'react';

export const useTechLogic = (products) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('default');

  const techProducts = products.filter(item => item.category === 'tech');

  const filteredSearch = techProducts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortedProducts = (data) => {
    let sortedData = [...data];
    if (sortType === 'low') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high') {
      sortedData.sort((a, b) => b.price - a.price);
    }
    return sortedData;
  };

  const displayProducts = getSortedProducts(filteredSearch);
  const trendingTech = techProducts.slice(0, 6);
  const recommendations = techProducts.slice(6, 14);

  return {
    searchTerm,
    setSearchTerm,
    sortType,
    setSortType,
    displayProducts,
    trendingTech,
    recommendations
  };
};