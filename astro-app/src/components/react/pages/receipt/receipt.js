

class Receipt {

    constructor(){
        this.receiptItems = [];
        this.tax = 0;
    }


    updateTax(tax){
        this.tax = tax;
    }

    addItem(item){

        let exist = false;
        this.receiptItems.forEach((receiptItem) => {

            if(receiptItem.item.id == item.id){
                receiptItem.increaseQuantity();
                exist = true;
            }

        });

        if(!exist){
            this.receiptItems.push(ReceiptItem(item, 1));
        }

    }

    removeItem(itemId){

        let newReceiptItemArr = [];

        this.receiptItems.forEach((receiptItem) => {
            if(receiptItem.item.id != itemId){
                newReceiptItemArr.push(receiptItem);
            }
            else{

                if(receiptItem.quantity > 1){
                    receiptItem.decreaseQuantity();
                    newReceiptItemArr.push(receiptItem);
                }

            }
        });

        this.receiptItems = newReceiptItemArr;

    }    

    pushNewReceiptItem(){

    }


}