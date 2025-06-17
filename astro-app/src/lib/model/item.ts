


export class Item {

    public readonly id: number;
    private _name: string;
    private _price: number;

    public constructor(name: string, price: number){

        this.id = Date.now();
        this._name = name;
        this._price = price;

    }

    /**--------------------------------------------
     *               getset
     *---------------------------------------------**/
    get name(): string {
        return this._name;
    }

    set name(setname: string){
        this._name = setname;
    }


    get price(): number {
        return this._price;
    }

    set price(setprice: number){
        if(setprice < 0){
            throw new Error("Item.price must be a non-negative number!");
        }
        this._price = setprice;
    }
    /*--------------- END OF SECTION --------------*/
    
    


}