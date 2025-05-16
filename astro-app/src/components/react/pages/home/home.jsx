import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectValue, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";


export default function Home(){

    const [items, setItems] = useState([]);
    const [totalBeforeTax, setTotalBeforeTax] = useState(0);
    const [totalAfterTax, setTotalAfterTax] = useState(0);
    const [tax, setTax] = useState("");
    const [person, setPerson] = useState([]);

    const incrementField = () => {

        const id = Date.now();

        setItems([...items, {
            id: id ,
            name: "",
            price: "",
        }]);

    }


    const incrementPerson = () => {

        const id = Date.now();

        setPerson([...person, {
            id: id ,
            name: "",
            itemToAdd: {},
            items: [],
            totalPrice: 0,
        }]);

    }


    const incrementPersonItem = (personId) => {

        let arr = [];

        person.forEach((p) => {

            if(p.id == personId){

                if(!checkPersonHasItem(p.id, p.itemToAdd.id)){
                    p.items.push(p.itemToAdd);
                }

            }

            arr.push(p);

        });


        calcPersonTotal(personId);

        setPerson(arr);

    }

    const toAddValueChanged = (value, personId) => {

        let arr = [];

        person.forEach((p) => {

            if(p.id == personId){
                items.forEach((item) => {
                    if(item.id == value){
                        p.itemToAdd = item;
                    }
                });

            }
            arr.push(p);

        });


        setPerson(arr);


    }


    const updatePersonName = (id, value) => {

        let arr = [...person]

        arr.forEach((item) => {
            if(item.id == id){
                item.name = value;
            }
        });

        setPerson(arr);

    }

    const updateName = (id, value) => {

        let arr = [...items]

        arr.forEach((item) => {
            if(item.id == id){
                item.name = value;
            }
        });

        setItems(arr);

    }


    const updatePrice = (id, value) => {


        if(isValidPrice(value)){

            let arr = [...items]

            arr.forEach((item) => {
                if(item.id == id){
                    item.price = value;
                }
            });

            setItems(arr);

        }


    }


    const updateTax = (value) => {


        if(isValidPrice(value)){

            setTax(value);


            let beforeTax = totalBeforeTax;

            let taxRate = 1;

            if(!isNaN(parseFloat(value))){
                taxRate = 1 + (parseFloat(value) / 100);
            }

            const afterTax = beforeTax * taxRate;

            setTotalAfterTax(afterTax);


        }

    }


    const updateTotalPrice  = () => {

        let beforeTax = 0;

        items.forEach((item) => {

            let itemPrice = 0;

            if(!isNaN(parseFloat(item.price))){
                itemPrice = parseFloat(item.price);
            }

            beforeTax += itemPrice;

        });

        let taxRate = 1;

        if(!isNaN(parseFloat(tax))){
            taxRate = 1 + (parseFloat(tax) / 100);
        }

        const afterTax = beforeTax * taxRate;

        setTotalBeforeTax(beforeTax);
        setTotalAfterTax(afterTax);

    }

    const isValidPrice = (str) => {
        if(str == ""){
            return true;
        }
        return /^(\d*\.\d+|\d+\.?\d*)$/.test(str) && parseFloat(str) >= 0;
    }

    const checkPersonHasItem = (personId, itemId) => {

        let exist = false;

        let checkPerson = person.find((p) => {
            if(p.id == personId) return true;
            return false;
        });

        checkPerson.items.forEach((i) =>{
            if(i.id == itemId){
                exist = true;
            }
        });

        return exist;


    }


    const removePersonAt = (id) => {

        if(items.length == 1){
            clearAllPerson();
        }
        else{
            let arr = [];

            for(let i = 0; i < person.length; i++){
                if(person[i].id != id){
                    arr.push(person[i]);
                }
            }

            setPerson(arr);
        }

    }

    const removePersonItemAt = (personId, itemId) => {
        let arr = [];


        for(let i = 0; i < person.length; i++){

            let newPerson = person[i];

            if(newPerson.id == personId){

                let newItemList = [];
                for(let j = 0; j < newPerson.items.length; j++){

                    if(newPerson.items[j].id != itemId){
                        newItemList.push(newPerson.items[j]);
                    }

                }

                newPerson.items = newItemList;


            }

            arr.push(newPerson);

        }

        calcPersonTotal(personId);

        setPerson(arr);

    }


    const removeAt = (id) => {

        if(items.length == 1){
            clearAll();
        }
        else{
            let arr = [];

            for(let i = 0; i < items.length; i++){
                if(items[i].id != id){
                    arr.push(items[i]);
                }
                else{

                    let beforeTax = totalBeforeTax;

                    const price = items[i].price;

                    let itemPrice = 0;

                    if(!isNaN(parseFloat(price))){
                        itemPrice = parseFloat(price);
                    }

                    beforeTax -= itemPrice;
                    let taxRate = 1;

                    if(!isNaN(parseFloat(tax))){
                        taxRate = 1 + (parseFloat(tax) / 100);
                    }

                    const afterTax = beforeTax * taxRate;

                    setTotalBeforeTax(beforeTax);
                    setTotalAfterTax(afterTax);

                }
            }

            setItems(arr);
        }


    }

    const calcPersonTotal = (personId) => {

        let personArr = [];

        person.forEach((p) => {
            if(p.id == personId){
                let total = 0;

                p.items.forEach((item) =>{
                    total += parseFloat(item.price);
                });

                p.total = total;

            }
            personArr.push(p);
        });

        setPerson(personArr);


    }


    const clearAll = () => {
        const id = Date.now();

        setItems([{
            id: id ,
            name: "",
            price: "",
        }]);

        setTotalAfterTax(0);
        setTotalBeforeTax(0);


    }


    const clearAllPerson = () => {
        setPerson([]);
    }


    useEffect(() => {
    }, []);


    return(
        <div
            className="
                py-14
            "
        >
            <div
                className="
                    flex
                    flex-col
                    justify-start
                    items-center
                    gap-y-3
                    w-[70%]
                    mx-auto
                "
            >

                    <div
                        className="
                            flex
                            justify-between
                            w-full
                        "
                    >
                        <div
                            className="
                                w-3/6
                                text-start
                            "
                        >
                            <span>Item</span>
                        </div>
                        
                        <div
                            className="
                                w-2/6
                                text-start
                            "
                        >
                            <span>Price</span>
                        </div>

                        <div
                            className="
                                w-1/6
                                text-start
                            "
                        >
                            <span>Action</span>
                        </div>



                    </div>


                    {
                        items.map((item, index) => (
                            <div
                                className="
                                    flex
                                    gap-x-3
                                    w-full
                                "
                            >
                                <Input 
                                    type="text" 
                                    className="w-3/6"
                                    name={"Item-" + item.id}
                                    id={"Item-" + item.id}
                                    value={item.name}
                                    onChange={(e) => { updateName(item.id, e.target.value) }}
                                    placeholder="Item Name"
                                />
                                <Input 
                                    type="text" 
                                    className="w-2/6"
                                    name={"Price-" + item.id}
                                    id={"Price-" + item.id}
                                    value={item.price}
                                    onChange={(e) => { 
                                        updatePrice(item.id, e.target.value);
                                        updateTotalPrice();
                                    }}
                                    placeholder="0"
                                />
                                <div
                                    className="
                                        w-1/6
                                    "
                                >
                                    <Button
                                        type="button"
                                        className="
                                            w-full
                                            cursor-pointer
                                            bg-rose-400
                                        "
                                        onClick={() => {
                                            removeAt(item.id);
                                        }}
                                    >
                                        <Minus />
                                    </Button>
                                </div>
                            </div>
                        ))
                    }

                    <div
                        className="
                            w-full
                            flex
                            justify-end
                            gap-x-3
                        "
                    >

                        <Button
                            type="button"
                            className="
                                cursor-pointer
                            "
                            onClick={incrementField}
                        >
                            <Plus />
                        </Button>


                        <Button
                            type="button"
                            className="
                                cursor-pointer
                                bg-red-400
                            "
                            onClick={() => {
                                clearAll();
                            }}
                        >
                            <span>Remove All</span>
                        </Button>


                    </div>


                    <div
                        className="
                            flex
                            justify-center
                            gap-x-3
                            w-full
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                justify-center
                                items-end
                                w-4/6
                            "
                        >
                            <span>Total Before Tax</span>
                        </div>
                        <Input 
                            type="text" 
                            className="w-2/6"
                            name={"totalBeforeTax"}
                            id={"totalBeforeTax"}
                            readOnly
                            placeholder="0"
                            value={totalBeforeTax}
                        />
                    </div>


                    <div
                        className="
                            flex
                            justify-center
                            gap-x-3
                            w-full
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                justify-center
                                items-end
                                w-4/6
                            "
                        >
                            <span>Tax %</span>
                        </div>
                        <Input 
                            type="text" 
                            className="w-2/6"
                            name={"tax"}
                            id={"tax"}
                            placeholder="0"
                            value={tax}
                            onChange={(e) => {
                                updateTax(e.target.value);
                            }}
                        />
                    </div>


                    <div
                        className="
                            flex
                            justify-center
                            gap-x-3
                            w-full
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                justify-center
                                items-end
                                w-4/6
                            "
                        >
                            <span>Total After Tax</span>
                        </div>
                        <Input 
                            type="text" 
                            className="w-2/6"
                            name={"totalAfterTax"}
                            id={"totalAfterTax"}
                            readOnly
                            placeholder="0"
                            value={totalAfterTax}
                        />
                    </div>

            </div>

            <div
                className="
                    flex
                    flex-col
                    gap-y-3
                    justify-center
                    w-[70%]
                    mx-auto
                    pt-14
                "
            >

                <div
                    className="
                            h-px
                            w-full
                            bg-neutral-700
                            mb-8
                    "
                />

                    {
                        person.map((person, index) => (
                            <div
                                className="
                                    flex
                                    flex-col
                                    border-[1px]
                                    px-5
                                    py-10
                                    border-neutral-600
                                    rounded-md
                                    gap-y-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        gap-x-3
                                        w-full
                                    "
                                >
                                    <Input 
                                        type="text" 
                                        className="w-5/6"
                                        name={"person-" + person.id}
                                        id={"person-" + person.id}
                                        value={person.name}
                                        onChange={(e) => { updatePersonName(person.id, e.target.value) }}
                                        placeholder="Name"
                                    />
                                    <div
                                        className="
                                            w-1/6
                                        "
                                    >
                                        <Button
                                            type="button"
                                            className="
                                                w-full
                                                cursor-pointer
                                                bg-rose-400
                                            "
                                            onClick={() => {
                                                removePersonAt(person.id);
                                            }}
                                        >
                                            <Minus />
                                        </Button>
                                    </div>
                                </div>

                                {


                                    (person.items.length != 0) && (

                                        <div
                                            className="
                                                flex
                                                mt-2
                                                gap-x-3
                                            "
                                        >
                                            <div
                                                className="
                                                    w-5/6
                                                "
                                            >
                                                <span>
                                                    Items
                                                </span>
                                            </div>

                                            <div
                                                className="
                                                    w-2/6
                                                "
                                            >
                                                <span>
                                                    Price
                                                </span>
                                            </div>


                                        </div>

                                    )


                                }


                                {

                                    (person.items.length != 0) && (
                                        
                                        person.items.map((item) => (
                                            <div
                                                className="
                                                    flex
                                                    w-full
                                                    gap-x-3
                                                "
                                            >


                                                <Input 
                                                    type="text" 
                                                    className="w-4/6"
                                                    name={"person-" + person.id + "-item" + item.id}
                                                    id={"person-" + person.id + "-itemname" + item.id}
                                                    placeholder="0"
                                                    value={item.name}
                                                    readOnly
                                                />

                                                <Input 
                                                    type="text" 
                                                    className="w-1/6"
                                                    name={"person-" + person.id + "-item" + item.id}
                                                    id={"person-" + person.id + "-itemprice" + item.id}
                                                    placeholder="0"
                                                    value={item.price}
                                                    readOnly
                                                />

                                                <Button
                                                    type="button"
                                                    className="
                                                        w-1/6
                                                        cursor-pointer
                                                        bg-rose-400
                                                    "
                                                    onClick={() => {removePersonItemAt(person.id, item.id)}}
                                                >
                                                    <Minus />
                                                </Button>
                                                                        

                                            </div>
                                        ))



                                    )

                                }





                                <div
                                    className="
                                        flex
                                        gap-x-3
                                    "
                                >

                                    <Select onValueChange={(value) => {
                                        toAddValueChanged(value, person.id);
                                    }}>
                                        <SelectTrigger
                                            className="w-5/6"
                                        >
                                            <SelectValue placeholder="Select Item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                items.map((item) => {

                                                    if(!checkPersonHasItem(person.id, item.id)){
                                                        return (
                                                            <SelectItem value={item.id}>{item.name}</SelectItem>
                                                        )
                                                    }

                                                })
                                            }
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        type="button"
                                        className="
                                            cursor-pointer
                                            w-1/6
                                            bg-amber-100
                                        "
                                        onClick={() => {
                                            incrementPersonItem(person.id);
                                        }}
                                    >
                                        <span>Add item</span>
                                    </Button>

                                </div>



                                {


                                    (person.items.length != 0) && (

                                        <div
                                            className="
                                                flex
                                                mt-2
                                                gap-x-3
                                            "
                                        >
                                            <div
                                                className="
                                                    w-5/6
                                                    flex
                                                    flex-col
                                                    justify-center
                                                "
                                            >
                                                <span>
                                                    Total
                                                </span>
                                            </div>

                                            <Input 
                                                type="text" 
                                                className="w-1/6"
                                                name={"person-" + person.id + "-item" + person.id}
                                                id={"person-" + person.id + "-totalprice" + person.id}
                                                placeholder="0"
                                                value={person.total}
                                                readOnly
                                            />


                                        </div>

                                    )


                                }



                            </div>
                        ))
                    }



                <Button
                    type="button"
                    className="
                        cursor-pointer
                        w-full
                    "
                    onClick={() => {
                        incrementPerson();
                    }}
                >
                    <span>Add Person</span>
                </Button>


            </div>

        </div>
    );

}