

import { Product } from '../service/product';
import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart{
    shoppingCartItemCount: number;
    items:ShoppingCartItem[] =[];

    constructor(private itemsMap:{[productId:string]:ShoppingCartItem}){
        this.itemsMap = itemsMap || {};
       for(let productId in itemsMap){
           let item = itemsMap[productId];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
       }
     }

    get totalItemsCount(){
        let count =0;
        for (let productId in this.itemsMap){
            count+=this.itemsMap[productId].quantity;
        }
        return count;
    }

    get totalPrice(){
        let totalPrice=0;
        for(let item of this.items){
            totalPrice+= item.totalPrice  
        }
        return  totalPrice;
    }


    getQuantity(product:Product){
        let item = this.itemsMap[product.key];
        return (item) ? item.quantity : 0;
     }

}