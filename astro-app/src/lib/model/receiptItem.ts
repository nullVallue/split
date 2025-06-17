import { Item } from "@/lib/model/item";

export class ReceiptItem {

    public readonly item : Item;
    private _quantity : number;

    public constructor(item: Item, quantity: number){

        this.item = item;
        this._quantity = quantity;

    }

    /**--------------------------------------------
     *               getset
     *---------------------------------------------**/
    get quantity() : number {
        return this._quantity;
    }

    set quantity(setquantity : number){
        this._quantity = setquantity;
    }
    /*--------------- END OF SECTION --------------*/
    
    

    public increaseQuantity(){
        this._quantity++;
    }


    public decreaseQuantity(){
        this._quantity--;
    }

    calcTotal(){
        return this.item.price * this._quantity;
    }

}