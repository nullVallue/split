import { Check, Ellipsis, Plus, X } from "lucide-react";
import { receipt } from "@/data/receiptStores";
import { useStore } from "@nanostores/react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Input from "@/components/react/components/input";
import Button from "@/components/react/components/button";
import { Item } from "@/lib/model/item";
import type { ReceiptItem } from "@/lib/model/receiptItem";
import Modal from "@/components/react/components/modal";


export default function ItemList(){

    //#region Variables
    /**--------------------------------------------
     *               General Vars
     *---------------------------------------------**/
    const $receipt = useStore(receipt);
    /*--------------- END OF General Vars --------------*/
    
    
    /**--------------------------------------------
     *               Valdiation Vars
     *---------------------------------------------**/
    const validationMessages = {
        name: "Please enter a valid item name",
        price: "Please enter a valid price",
        qty: "Please enter a valid quantity",
    }
    const [validationMsg, setValidationMsg] = useState("");
    /*--------------- END OF Validation Vars --------------*/
    

    /**--------------------------------------------
     *               Create Form Vars
     *---------------------------------------------**/
    const [createFieldVisible, setCreateFieldVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [showValidationMessage, setShowValidationMessage] = useState<boolean>(false);
    /*--------------- END OF Create Form Vars --------------*/
    

    /**--------------------------------------------
     *               Edit Form Vars
     *---------------------------------------------**/
    const [showEditValidationMessage, setShowEditValidationMessage] = useState<boolean>(false);
    const itemNameRef = useRef(null);
    const itemQtyRef = useRef(null);
    const itemPriceRef = useRef(null);
    const [editValidationMsg, setEditValidationMsg] = useState("");
    const [editItemName, setEditItemName] = useState("");
    const [editItemQty, setEditItemQty] = useState("");
    const [editItemPrice, setEditItemPrice] = useState("");

    /*--------------- END OF Edit Form Vars --------------*/
    

    /**--------------------------------------------
     *               Action Menu Vars
     *---------------------------------------------**/
    const [itemToShowActionMenu, setItemToShowActionMenu] = useState<ReceiptItem | null>(null);
    const [showActionMenu, setShowActionMenu] = useState<boolean>(false);
    /*--------------- END OF Action Menu Vars --------------*/
    
    
    /**--------------------------------------------
     *               Modal Vars
     *---------------------------------------------**/
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    /*--------------- END OF Modal Vars --------------*/



    /**--------------------------------------------
     *               Receipt Footer Vars
     *---------------------------------------------**/
    const [taxField, setTaxField] = useState<string>("");
    const [showTaxValidationMsg, setShowTaxValidationMessage] = useState<boolean>(false);
    /*--------------- END OF Receipt Footer Vars --------------*/
    //#endregion    
    

    //#region Create Functions
    /**------------------------------------------------------------------------
     *                           Create Functions
     *------------------------------------------------------------------------**/
    const onClickShowCreateField = () => {
        if(!createFieldVisible){
            setCreateFieldVisible(true);
        }
    }

    const onClickCancelCreate = () => {
        setShowValidationMessage(false);
        setCreateFieldVisible(false);
    }

    const onClickConfirmCreate = () => {
        setCreateFieldVisible(false);
    }


    const addNewItemToReceipt = (
        itemName: string, 
        itemQty: number, 
        itemPrice: number
    ) => {
        const item : Item = new Item(itemName, itemPrice);
        $receipt.addItem(item, itemQty);
    }


    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if(name == "itemName" && showValidationMessage && validationMsg == validationMessages.name) {
            setShowValidationMessage(false);
            setValidationMsg("");
        }

        if(name == "itemQty" && showValidationMessage && validationMsg == validationMessages.qty) {
            setShowValidationMessage(false);
            setValidationMsg("");
        }

        if(name == "itemPrice" && showValidationMessage && validationMsg == validationMessages.price) {
            setShowValidationMessage(false);
            setValidationMsg("");
        }

        setFormData(existing => ({
            ...existing,
            [name]:value
        }));

    }

    const onSubmitNewItem = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let price : string = formData.itemPrice??"0";
        let qty : string = formData.itemQty??"1";

        let hasError : boolean = false;


        if(formData.itemName != null && !hasError){
            hasError = !validateItemName(formData.itemName);
            if(hasError) setValidationMsg(validationMessages.name);
        }
        else if(formData.itemName == null || formData.itemName == ""){
            hasError = true;
            setValidationMsg(validationMessages.name);
        }


        if(qty == ""){
            qty = "0";
        }

        if(formData.itemQty != null && !hasError){
            hasError = !validateItemQuantity(formData.itemQty);
            if(hasError) setValidationMsg(validationMessages.qty);
        }

        if(price == ""){
            price = "0";
        }

        if(formData.itemPrice != null && !hasError){
            hasError = !validateItemPrice(formData.itemPrice);
            if(hasError) setValidationMsg(validationMessages.price);
        }

        if(!hasError){
            const itemName : string = formData.itemName;
            const itemQty : number = Number(qty);
            const itemPrice: number = Number(price);

            addNewItemToReceipt(itemName, itemQty, itemPrice);
            setCreateFieldVisible(false);
        }
        else{
            setShowValidationMessage(true);
        }

    }


    /*---------------------------- END OF Create Functions ----------------------------*/
    //#endregion
    
    

    //#region Action Menu Functions
    /**------------------------------------------------------------------------
     *                           Action Menu Functions
     *------------------------------------------------------------------------**/
    const onClickShowActionMenu = (receiptItem: ReceiptItem) => {
        setItemToShowActionMenu(receiptItem);
        setShowActionMenu(true);
    }

    const onClickCloseActionMenu = () => {
        setItemToShowActionMenu(null);
        setShowActionMenu(false);
    }

    const onClickEditItem = (receiptItem: ReceiptItem) => {
        setShowActionMenu(false);
        setShowEditModal(true);
        setEditItemName(receiptItem.item.name);
        setEditItemQty(receiptItem.quantity.toString());
        setEditItemPrice(receiptItem.item.price.toString());
    }

    const onClickRemoveItem = (receiptItem: ReceiptItem) => {
        $receipt.removeItem(receiptItem.item, true);
        setShowActionMenu(false);
    }
    /*---------------------------- END OF Action Menu Functions ----------------------------*/
    //#endregion
    
    

    //#region Modal Functions
    /**------------------------------------------------------------------------
     *                           Modal Functions
     *------------------------------------------------------------------------**/
    const onClickCloseModal = () => {
        setShowEditModal(false);
        setItemToShowActionMenu(null);
        setShowEditValidationMessage(false);
        setEditValidationMsg("");
        setEditItemName("");
        setEditItemQty("");
        setEditItemPrice("");
    }
    /*---------------------------- END OF Modal Functions ----------------------------*/
    
    //#endregion
    



    //#region Validation Functions
    /**------------------------------------------------------------------------
     *                           Validation Functions
     *------------------------------------------------------------------------**/
    const validateItemName = (str : string): boolean => {
        return (str.trim() !== "");
    }

    const validateItemQuantity = (str : string): boolean => {
        const num = Number(str);
        return Number.isInteger(num) && num > 0;
    }

    const validateItemPrice = (str : string):boolean => {
        const num = Number(str);
        return !isNaN(num) && num >= 0;
    }
    
    const validateTaxInput = (str : string):boolean => {
        const num = Number(str);
        return !isNaN(num) && num >= 0;
    }
    /*---------------------------- END OF Validation Functions ----------------------------*/
    //#endregion
    
    

    //#region Update / Edit Functions
    /**------------------------------------------------------------------------
     *                           Update/Edit Functions
     *------------------------------------------------------------------------**/

    const updateReceiptItem = (
        itemName: string, 
        itemQty: number, 
        itemPrice: number
    ) => {
        let newReceiptItem : ReceiptItem = itemToShowActionMenu!;
        newReceiptItem.quantity = itemQty;
        newReceiptItem.item.name = itemName;
        newReceiptItem.item.price = itemPrice;

        $receipt.updateReceiptItem(newReceiptItem);

    }


    const handleEditChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if(name == "editItemName") {
            setEditItemName(value);
            if(showEditValidationMessage && editValidationMsg == validationMessages.name){
                setShowEditValidationMessage(false);
                setEditValidationMsg("");
            }
        }

        if(name == "editItemQty") {
            setEditItemQty(value);
            if(showEditValidationMessage && editValidationMsg == validationMessages.qty){
                setShowEditValidationMessage(false);
                setEditValidationMsg("");
            }
        }

        if(name == "editItemPrice") {
            setEditItemPrice(value);
            if(showEditValidationMessage && editValidationMsg == validationMessages.price){
                setShowEditValidationMessage(false);
                setEditValidationMsg("");
            }
        }
    }


    const onSubmitEditItem = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let name : string = editItemName;
        let price : string = editItemPrice;
        let qty : string = editItemQty;

        let hasError : boolean = false;


        if(name != null && !hasError){
            hasError = !validateItemName(name);
            if(hasError) setValidationMsg(validationMessages.name);
        }
        else if(name == ""){
            hasError = true;
            setValidationMsg(validationMessages.name);
        }

        if(isNaN(Number(qty)) || qty == ""){
            qty = "1";
        }

        if(qty != null && !hasError){
            hasError = !validateItemQuantity(qty);
            if(hasError) setValidationMsg(validationMessages.qty);
        }

        if(isNaN(Number(price)) || price == ""){
            price = "";
        }

        if(price != null && !hasError){
            hasError = !validateItemPrice(price);
            if(hasError) setValidationMsg(validationMessages.price);
        }

        if(!hasError){
            const itemName : string = name;
            const itemQty : number = Number(qty);
            const itemPrice: number = Number(price);

            updateReceiptItem(itemName, itemQty, itemPrice);
            onClickCloseModal();
        }
        else{
            setShowEditValidationMessage(true);
        }

    }


    /*---------------------------- END OF Update/Edit Functions ----------------------------*/
    //#endregion
    
    

    //#region Receipt Footer Functions
    /**------------------------------------------------------------------------
     *                           Receipt Footer Functions
     *------------------------------------------------------------------------**/


    const handleTaxOnChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setTaxField(value);
        let tax :string = value;

        if(value == ""){
            tax = "0";
        }

        if(validateTaxInput(tax)){
            $receipt.tax = Number(tax);
            setShowTaxValidationMessage(false);
        }
        else{
            setShowTaxValidationMessage(true);
        }

    }




    /*---------------------------- END OF Receipt Footer Functions ----------------------------*/
    //#endregion
    
    





    //#region UI START
    return(
        <div>

            
            {
                //#region Receipt Header
            }   
            {/* /**------------------------------------------------------------------------
             *                           receipt header 
             *------------------------------------------------------------------------**/}
            {

                ($receipt.receiptItems.length != 0) && (
                    <div
                        className="
                            flex
                            mt-7
                            mb-3
                            text-yellow-400
                        "
                    >
                        <div
                            className="
                                w-3/12
                            "
                        >
                            <p
                                className="
                                    text-start
                                    font-bold
                                    text-sm
                                "
                            >
                                Name
                            </p>
                        </div>


                        <div
                            className="w-2/12"
                        >
                            <p
                                className="
                                    text-end
                                    font-bold
                                    text-sm
                                "
                            >
                               Qty
                            </p>
                        </div>


                        <div
                            className="w-2/12"
                        >
                            <p
                                className="
                                    text-end
                                    font-bold
                                    text-sm
                                "
                            >
                                Price
                            </p>
                        </div>


                        <div
                            className="w-3/12"
                        >
                            <p
                                className="
                                    text-end
                                    font-bold
                                    text-sm
                                "
                            >
                                Total
                            </p>
                        </div>

                        <div
                            className="
                                w-2/12
                            "
                        >
                        </div>


                    </div>
                )

            }
            {
                //#endregion
            }   
            {/* /*---------------------------- END OF Receipt Head----------------------------*/}
            
            
            
            



            {
                //#region Receipt Body
            }   
            {/* /**------------------------------------------------------------------------
             *                           receipt contents
             *------------------------------------------------------------------------**/}

            {
                $receipt.receiptItems.map((receiptItem) => {
                    return (
                        <>
                            <div
                                className="
                                    flex
                                    my-5
                                "
                            >
                                <div
                                    className="
                                        w-3/12
                                    "
                                >
                                    <p
                                        className="
                                            break-words
                                            text-sm
                                        "
                                    >
                                        {receiptItem.item.name}
                                    </p>
                                </div>
                                <div
                                    className="w-2/12"
                                >
                                    <p
                                        className="
                                            text-right
                                            text-sm
                                        "
                                    >
                                        x{receiptItem.quantity}
                                    </p>
                                </div>
                                <div
                                    className="w-2/12"
                                >
                                    <p
                                        className="
                                            text-right
                                            text-sm
                                        "
                                    >
                                        {receiptItem.item.price.toFixed(2)}
                                    </p>
                                </div>
                                <div
                                    className="w-3/12"
                                >
                                    <p
                                        className="
                                            text-right
                                            text-sm
                                        "
                                    >
                                        {receiptItem.calcTotal().toFixed(2)}
                                    </p>
                                </div>

                                <div
                                    className="
                                        w-2/12
                                        relative
                                    "
                                >

                                    {
                                        showActionMenu && (itemToShowActionMenu == receiptItem) && (
                                            <ul
                                                className="
                                                    bg-muted
                                                    absolute
                                                    right-full
                                                    p-5
                                                    flex
                                                    flex-col
                                                    rounded
                                                    text-sm
                                                    gap-y-5
                                                "
                                            >
                                                <li>
                                                    <button
                                                        type="button"
                                                        className="
                                                            cursor-pointer
                                                        "
                                                        onClick={() => {
                                                            onClickEditItem(receiptItem)
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        type="button"
                                                        className="
                                                            cursor-pointer
                                                        "
                                                        onClick={() => {
                                                            onClickRemoveItem(receiptItem)
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            </ul>
                                        )
                                    }

                                    {
                                         (itemToShowActionMenu != receiptItem) && (


                                            <button
                                                type="button"
                                                className="
                                                    flex
                                                    justify-center
                                                    w-full
                                                "
                                            >
                                                <Ellipsis
                                                    className="cursor-pointer"
                                                    onClick={() => {onClickShowActionMenu(receiptItem)}}
                                                />
                                            </button>
                                        )

                                    }

                                    {

                                        showActionMenu && (itemToShowActionMenu == receiptItem) && (

                                            <button
                                                type="button"
                                                className="
                                                    flex
                                                    justify-center
                                                    w-full
                                                "
                                            >
                                                <X
                                                    className="cursor-pointer"
                                                    onClick={onClickCloseActionMenu}
                                                />
                                            </button>


                                        )
                                    }
                                </div>



                            </div>
                        </>
                    );
                })
            }
            {
                //#endregion
            }   
            {/* /*---------------------------- END OF Receipt Body ----------------------------*/}



            {
                //#region Receipt Footer
            }   
            {/* /**------------------------------------------------------------------------
             *                          Receipt Footer
             *------------------------------------------------------------------------**/}


            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                "
            >
                <div
                    className="
                        flex
                        justify-end
                        items-center
                        gap-x-5
                    "
                >
                    <p>Tax : </p>
                    <Input 
                        type="number"
                        className="
                            [appearance:textfield] 
                            [&::-webkit-outer-spin-button]:appearance-none 
                            [&::-webkit-inner-spin-button]:appearance-none
                            w-1/4
                            py-0
                            text-right
                        "
                        value={taxField}
                        onChange={handleTaxOnChange}
                    />
                    <p>%</p>
                </div>
                <div
                    className="
                        flex
                        justify-end
                    "
                >
                    <p>Total : {($receipt.calcTotal() * ($receipt.tax/100 + 1)).toFixed(2)}</p>
                </div>
            </div>
            {
                showTaxValidationMsg && (
                    <p className="text-red-400">Please enter a valid tax amount</p>
                )
            }


            {/* /*---------------------------- END OF Receipt Footer ----------------------------*/}
            {
                //#endregion
            }   



            


            {
                //#region Edit Modal
            }   
            {/* /**------------------------------------------------------------------------
             *                          Edit Modal 
             *------------------------------------------------------------------------**/}
            <Modal
                onCloseModal={onClickCloseModal}
                isOpen={showEditModal}
            >
                <h3
                    className="
                        my-5
                        mx-5
                    "
                >
                    Editing Item...
                </h3>
                <form
                    className="
                        w-full
                        flex
                        flex-col
                        pb-20
                        px-5
                        gap-y-4
                    "
                    onSubmit={onSubmitEditItem}
                >


                    <Input 
                        placeholder="Item Name"
                        name="editItemName"
                        onChange={handleEditChange}
                        ref={itemNameRef}
                        value={editItemName}
                    />

                    <div
                        className="
                            flex
                            gap-x-2
                            w-full
                        "
                    >
                        <Input
                            placeholder="Qty (1)"
                            name="editItemQty"
                            type="number"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            onChange={handleEditChange}
                            ref={itemQtyRef}
                            value={editItemQty}

                        />
                        <Input
                            placeholder="Price (0.00)"
                            name="editItemPrice"
                            type="number"
                            onChange={handleEditChange}
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            ref={itemPriceRef}
                            value={editItemPrice}
                        />
                    </div>


                    {
                        showEditValidationMessage && (
                            <p
                                className="text-red-400"
                            >
                                {validationMsg}
                            </p>
                        )
                    }

                    <Button
                        type="submit"
                        className="
                            w-full
                            flex
                            justify-center
                            bg-yellow-400
                            text-black
                        "
                    >
                        Save
                    </Button>


                </form>
            </Modal>
            {
                //#endregion
            }   
            {/* /*---------------------------- END OF Edit Modal ----------------------------*/}




            {
                //#region Create Form
            }   
            {/* /**------------------------------------------------------------------------
             *                         Create Form 
             *------------------------------------------------------------------------**/}

            {
                createFieldVisible && (
                    <form
                        onSubmit={onSubmitNewItem}
                        className="
                            my-5
                            flex
                            flex-col
                            w-full
                            gap-y-2
                        "
                    >
                        <Input 
                            placeholder="Item Name"
                            name="itemName"
                            onChange={handleChange}
                            ref={itemNameRef}
                        />

                        <div
                            className="
                                flex
                                gap-x-2
                                w-full
                            "
                        >
                            <Input
                                placeholder="Qty (1)"
                                name="itemQty"
                                type="number"
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                onChange={handleChange}
                                ref={itemQtyRef}

                            />
                            <Input
                                placeholder="Price (0.00)"
                                name="itemPrice"
                                type="number"
                                onChange={handleChange}
                                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                ref={itemPriceRef}
                            />
                        </div>


                        <div
                            className="
                                flex
                                gap-x-2
                                w-full
                            "
                        >
                            <Button
                                onClick={onClickCancelCreate}
                                type="button"
                                className="
                                    w-full
                                    flex
                                    justify-center
                                    bg-red-400
                                "
                            >
                                <X />
                            </Button>
                            <Button
                                type="submit"
                                className="
                                    w-full
                                    flex
                                    justify-center
                                    bg-green-400
                                "
                            >
                                <Check />
                            </Button>
                        </div>



                    </form>
                )
            }

            {
                showValidationMessage && (
                    <p className="text-red-400">
                        {validationMsg}
                    </p>
                )
            }

            {
                !createFieldVisible && (
                    <Button
                        type="button"
                        onClick={onClickShowCreateField}
                        className="
                            w-full
                            bg-yellow-400
                            flex
                            justify-center
                            my-5
                        "
                    >
                        <Plus
                            className="
                                text-black
                            "
                        />
                    </Button>
                )
            }

            {
                //#endregion
            }   
            {/* /*---------------------------- END OF Create Form ----------------------------*/}



        </div>
    );
    //#endregion
    
}