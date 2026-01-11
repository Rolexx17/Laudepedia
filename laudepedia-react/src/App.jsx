import React, { useState } from 'react';
import HomePage from './HomePage';
import FashionPage from './FashionPage';
import TechPage from './TechPage';
import BeautyPage from './BeautyPage';

// Import semua file detail
import B1 from './B1'; import B2 from './B2'; import B3 from './B3'; 
import B4 from './B4'; import B5 from './B5'; import B6 from './B6';
import B7 from './B7'; import B8 from './B8'; import B9 from './B9';
import B10 from './B10'; import C1 from './C1'; import C2 from './C2';
import C3 from './C3'; import S1 from './S1'; import T1 from './T1';
import T2 from './T2';

function App() {
  // State harus di dalam fungsi App
  const [activePage, setActivePage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  // Fungsi navigasi juga harus di dalam App agar bisa baca setActivePage
  const goToFashion = () => {
    setPreviousPage(null); 
    setActivePage('fashion');
  };

  const goToProduct = (id, fromFashion = false) => {
    if (fromFashion) {
      setPreviousPage('fashion');
    } else {
      setPreviousPage(null);
    }
    setActivePage(id);
  };

 const handleBack = () => {
  if (activePage === 'fashion' || activePage === 'tech' || activePage === 'beauty') {
    setActivePage(null); // Ini akan membawamu balik ke HomePage
  } else {
    setActivePage(previousPage);
  }
  setPreviousPage(null); 
};

  // Logika Render di dalam fungsi App
  const renderPage = () => {
    switch(activePage) {
      case 'fashion': 
        return <FashionPage onBack={handleBack} onProductClick={(id) => goToProduct(id, true)} />;
      case 'tech': 
        return <TechPage onBack={handleBack} onProductClick={(id) => goToProduct(id, true)} />;
      case 'beauty': 
        return <BeautyPage onBack={handleBack} onProductClick={(id) => goToProduct(id, true)} />;
      case 'B1': return <B1 onBack={handleBack} />;
      case 'B2': return <B2 onBack={handleBack} />;
      case 'B3': return <B3 onBack={handleBack} />;
      case 'B4': return <B4 onBack={handleBack} />;
      case 'B5': return <B5 onBack={handleBack} />;
      case 'B6': return <B6 onBack={handleBack} />;
      case 'B7': return <B7 onBack={handleBack} />;
      case 'B8': return <B8 onBack={handleBack} />;
      case 'B9': return <B9 onBack={handleBack} />;
      case 'B10': return <B10 onBack={handleBack} />;
      case 'C1': return <C1 onBack={handleBack} />;
      case 'C2': return <C2 onBack={handleBack} />;
      case 'C3': return <C3 onBack={handleBack} />;
      case 'S1': return <S1 onBack={handleBack} />;
      case 'T1': return <T1 onBack={handleBack} />;
      case 'T2': return <T2 onBack={handleBack} />;
      default: 
        return (
          <HomePage 
            onProductClick={(id) => goToProduct(id, false)} 
            onCategoryClick={(category) => {
              if (category === 'fashion') goToFashion();
              if (category === 'tech') { setPreviousPage(null); setActivePage('tech'); }
              if (category === 'beauty') { setPreviousPage(null); setActivePage('beauty'); }
            }} 
          />
        );
    }
  };

  // Return utama harus di dalam fungsi App
  return (
    <div className="App">
      {renderPage()}
    </div>
  );
} 

export default App;