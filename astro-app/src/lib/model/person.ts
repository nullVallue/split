
import { Item } from "@/lib/model/item";
import { PersonItem } from "@/lib/model/personItem";

export class Person {

    private readonly id: number;
    private _name: string;
    private _personItems: PersonItem[];

    public constructor(name: string, personItems : PersonItem[] = []){

        this.id = Date.now();
        this._name = name;
        this._personItems = personItems;

    }


    /**--------------------------------------------
     *               getset
     *---------------------------------------------**/
    set name(setname: string){
        this._name = setname;
    }    

    get name() : string{
        return this._name;
    }
    /*--------------- END OF SECTION --------------*/
    
    


    set personItems(setPersonItems: PersonItem[]){
        this._personItems = setPersonItems;
    }    

    get personItems() : PersonItem[] {
        return this._personItems;
    }    



    private checkItemExist(item: Item) : boolean{

        for(let i = 0; i < this.personItems.length; i++){
            if(this.personItems[i].item.id == item.id){
                return true;
            }
        }
        return false;

    }

    private removePersonItemFromArray(item: Item){
        let newPersonItemArr : PersonItem[] = [];

        for(let i = 0; i < this._personItems.length; i++){
            if(this._personItems[i].item.id != item.id){
                newPersonItemArr.push(this._personItems[i]);
            }
        }
        this._personItems = newPersonItemArr;
    }

    private performActionOnPersonItem(item: Item, action: (personItem: PersonItem) => void) : void {

        for(let i = 0; i < this._personItems.length; i++){
            if(this._personItems[i].item.id == item.id){
                action(this._personItems[i]);
                break;
            }
        }
    }


    private incrementExistingItem(item: Item) : void {
        this.performActionOnPersonItem(item, (personItem: PersonItem) => {
            personItem.increaseQuantity();
        });
    }

    private pushNewPersonItem(personItem: PersonItem) : void {
        this.personItems.push(personItem);
    }


    public addItem(item: Item) : void {
        if(this.checkItemExist(item)){
            this.incrementExistingItem(item);
        }
        else{
            this.pushNewPersonItem(new PersonItem(item, 1));
        }
    }


    public removeItem(item: Item): void {
        if(this.checkItemExist(item)){
            this.performActionOnPersonItem(item, (personItem) => {
                if(personItem.quantity > 1){
                    personItem.decreaseQuantity();
                }
                else{
                    this.removePersonItemFromArray(item);
                }
            });
        }
    }

    public calcTotal() : number {
        let total : number = 0;
        this.personItems.forEach((personItem) => {
            total += personItem.calcTotal();
        });
        return total;
    }

}