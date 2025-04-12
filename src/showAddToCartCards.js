import products from "../api/products.json";
import { fetchQuantityFromCartList } from "./fetchQuantityFromCartList";
import { getCartProductFromLS } from "./getCartProductFromLS";
import { incrementDecrement } from "./incrementDecrement";
import { removeProductFromCart } from "./removeProductFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd)=>{
   return cartProducts.some((curElem)=> curElem.id===curProd.id);
})
console.log(filterProducts);

// To update the add to cart page
const cartElement = document.getElementById("productCartContainer");
const templateContainer = document.getElementById("productCartTemplate");

const showCartProduct = ()=>{
    filterProducts.forEach((curProd)=>{
        const {category, id, image, name, stock, price} =curProd;

        let productClone = document.importNode(templateContainer.content, true );

        const LSActualData = fetchQuantityFromCartList(id, price);

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productQuantity").textContent = LSActualData.quantity ;
        productClone.querySelector(".productPrice").textContent = LSActualData.price;

       productClone.querySelector(".stockElement").addEventListener("click", (event)=>{
        incrementDecrement(event, id, stock, price);
       })

        productClone.querySelector(".remove-to-cart-button").addEventListener("click", ()=> removeProductFromCart(id));
        cartElement.append(productClone);
    })
}

showCartProduct();

updateCartProductTotal();