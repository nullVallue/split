

class ReceiptItem {


    constructor(item, quantity){
        this.item = item;
        this.quantity = quantity;



    }

    increaseQuantity(){
        this.quantity++;
    }

    decreaseQuantity(){
        this.quantity--;
    }

    calcTotal(){
        return this.item * this.quantity;
    }

    calcTotalWithTax(tax){
        return this.calcTotal() * (1 + tax);
    }

}