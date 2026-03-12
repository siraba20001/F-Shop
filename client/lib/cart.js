export const getCart = () => JSON.parse(localStorage.getItem('fshop-cart') || '[]');
export const saveCart = (cart) => localStorage.setItem('fshop-cart', JSON.stringify(cart));
