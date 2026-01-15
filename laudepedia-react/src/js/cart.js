export const addToCartLogic = (product, quantity) => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        existingCart[existingItemIndex].qty += parseInt(quantity);
    } else {
        existingCart.push({ ...product, qty: parseInt(quantity) });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
};