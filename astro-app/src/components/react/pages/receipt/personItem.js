

class PersonItem {


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

    
    calcTotalBeforeTax(){
        return this.item.price * this.quantity;
    }


    calcTotalAfterTax(tax){
        return this.calcTotalBeforeTax() * (1 + tax);
    }

}