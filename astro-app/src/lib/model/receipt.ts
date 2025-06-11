
class Receipt {

    private _receiptItems : ReceiptItem[];
    private _tax: number;

    public constructor(receiptItems: ReceiptItem[] = [], tax: number = 0){
        this._receiptItems = receiptItems;
        this._tax = tax;
    }


    /**--------------------------------------------
     *               getset
     *---------------------------------------------**/
    set tax(settax: number){
        this._tax = settax;
    }

    get tax() : number{
        return this._tax;
    }

    set receiptItems(setReceiptItems: ReceiptItem[]){
        this._receiptItems = setReceiptItems;
    }

    get receiptItems() : ReceiptItem[] {
        return this._receiptItems;
    }
    /*--------------- END OF SECTION --------------*/
    
    private performActionOnReceiptItem(item: Item, action: (receiptItem: ReceiptItem) => void) : void{
        for(let i = 0; i < this._receiptItems.length; i++){
            if(this._receiptItems[i].item.id == item.id){
                action(this._receiptItems[i]);
                break;
            }
        }
    }

    private checkItemExist(item: Item) : boolean{
        for(let i = 0; i < this.receiptItems.length; i++){
            if(this.receiptItems[i].item.id == item.id){
                return true;
            }
        }
        return false;
    }

    private pushNewReceiptItem(receiptItem: ReceiptItem) : void{
        this._receiptItems.push(receiptItem);
    }

    private removeReceiptItemFromArray(item: Item){
        let newReceiptItemArr : ReceiptItem[] = [];

        for(let i = 0; i < this._receiptItems.length; i++){
            if(this._receiptItems[i].item.id != item.id){
                newReceiptItemArr.push(this._receiptItems[i]);
            }
        }
        this._receiptItems = newReceiptItemArr;
    }


    public addItem(item: Item){
        if(this.checkItemExist(item)){
            this.performActionOnReceiptItem(item, (receiptItem: ReceiptItem) => {
                receiptItem.increaseQuantity();
            })
        }
        else{
            this.pushNewReceiptItem(new ReceiptItem(item, 1));
        }
    }


    public removeItem(item: Item){
        if(this.checkItemExist(item)){
            this.performActionOnReceiptItem(item, (receiptItem) => {
                if(receiptItem.quantity > 1){
                    receiptItem.decreaseQuantity();
                }
                else{
                    this.removeReceiptItemFromArray(item);
                }
            });
        }
    }



    public calcTotal(){
        let total : number = 0;
        for(let i = 0; i < this._receiptItems.length; i++){
            total += this._receiptItems[i].calcTotal();
        }
        return total;
    }








}