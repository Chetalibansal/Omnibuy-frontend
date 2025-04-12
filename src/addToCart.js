import { getCartProductFromLS } from "./getCartProductFromLS";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();

export const addToCart = (event, id, stock)=>{

    let arrLocalStorageProduct = getCartProductFromLS();

    const currentProdElem = document.getElementById(`card${id}`);
    let quantity = currentProdElem.querySelector(".productQuantity").innerText;
    let price = currentProdElem.querySelector(".productPrice").innerText;
    
    price = price.replace("₹", "");


    let existingProd = arrLocalStorageProduct.find((currProd)=> 
         currProd.id===id);
    

    if(existingProd && quantity>1){
        quantity = Number(existingProd.quantity)+Number(quantity);
        price = Number(price*quantity);
        price = Number(price.toFixed(2));
        let updatedCart = {id, quantity, price};

        updatedCart = arrLocalStorageProduct.map((curProd)=>{
            if(curProd.id===id) return updatedCart;
            else return curProd;
        });

        localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
        showToast("add", id);
    }

    if(existingProd) return false;

    price= Number(price*quantity);
    price = Number(price.toFixed(2));
    quantity = Number(quantity);
    
    arrLocalStorageProduct.push({id, quantity, price});
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    updateCartValue(arrLocalStorageProduct);

    showToast("add", id);
}