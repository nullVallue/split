

class Item {

    constructor(name, price){

        if(isNaN(parseFloat(price))){
            throw "Item : Price must be of type float"
        }

        this.id = Date.now();
        this.name = name;
        this.price = price;

    }


}