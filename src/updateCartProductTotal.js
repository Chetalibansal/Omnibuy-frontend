import { getCartProductFromLS } from "./getCartProductFromLS";

export const updateCartProductTotal = ()=>{
    let productSubTotal=  document.querySelector(".productSubTotal");
    let productFinalTotal = document.querySelector(".productFinalTotal");
    let cartProducts = getCartProductFromLS();

     let subTotal = 0;
    cartProducts.forEach(elem => {
        subTotal = subTotal+elem.price;
    });
    subTotal = Number(parseInt(subTotal));
    productSubTotal.innerText = `₹${subTotal}`;
    productFinalTotal.innerText = `₹${subTotal + 50}`;
    
}