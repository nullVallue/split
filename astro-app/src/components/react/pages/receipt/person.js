

class Person {

    constructor(name){
        this.id = Date.now();
        this.name = name;
        this.personItems = [];
    }


    pushNewPersonItem(personItem){
        this.personItems.push(personItem);
    }

    addItem(item){
        let exist = false;
        this.personItems.forEach((personItem) => {
            if(personItem.item.id == item.id){
                personItem.increaseQuantity();
                exist = true;
            }
        });

        if(!exist){
            this.personItems.push(PersonItem(item, 1));
        }

    }


    removeItem(itemId){
        let newPersonItemArr = [];

        this.personItems.forEach((personItem) =>{
            if(personItem.item.id != itemId){
                newPersonItemArr.push(personItem);
            }
            else{

                if(personItem.quantity > 1){
                    personItem.decreaseQuantity();
                    newPersonItemArr.push(personItem);
                }

            }
        });

        this.personItems = newItemArr;
    }


    calcTotalBeforeTax(){

        let total = 0;
        this.personItems.forEach((personItem) =>{
            total += personItem.calcTotalBeforeTax();
        });

        return total;

    }

    calcTotalAfterTax(tax){
        return this.calcTotalAfterTax() * (1 + tax);
    }

}