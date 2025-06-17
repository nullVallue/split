

import { Item } from "@/lib/model/item";


export class PersonItem {

    public readonly item : Item;
    private _quantity : number;


    public constructor(item: Item, quantity: number){
        this.item = item;
        this._quantity = quantity;
    }

    
    /**--------------------------------------------
     *               getset
     *---------------------------------------------**/
    get quantity() : number{
        return this._quantity;
    }

    set quantity(setquantity: number){
        if(setquantity < 1 || !Number.isInteger(setquantity)){
            throw new Error("PersonItem.quantity must be a non-zero positive integer");
        }

        this._quantity = setquantity;
    }
    /*--------------- END OF SECTION --------------*/
    
    

    public increaseQuantity(){
        this._quantity++;
    }

    public decreaseQuantity(){
        this._quantity--;
    }


    calcTotal() : number {
        return this.item.price * this.quantity;
    }


}