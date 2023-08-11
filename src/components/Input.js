import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Input() {

    const getItems=()=>{
    let items = localStorage.getItem("list");
    return JSON.parse(items);
    }
    
    const [Value, setValue] = useState("");
   const [Fvalue, setFvalue] = useState(getItems());
    const [Toggle, setToggle] = useState(false);
    const [editedVal, seteditedVal] = useState(null);
    const notify = () => toast("😂Empty Text😂");

    useEffect(()=>{
    localStorage.setItem("list" , JSON.stringify(Fvalue))
    },[Fvalue])

    const Add = () => {
        if (!Value) {
            notify();

        }
        else if (Value && Toggle) {   // if there is edit icon and some value in input tag
            setFvalue(
                Fvalue.map((ele) => {
                    if (ele.id === editedVal) {
                        return { ...ele, name: Value }
                    }
                    return ele;
                })
            )
            setValue("");
            setToggle(false);
            seteditedVal(null);
        }
        else {                        // if there is plus icon and some value in the input tag
            const addVal = { id: new Date().getTime().toString(), name: Value }
            setFvalue([...Fvalue, addVal]);
            setValue("");
        }
    }

    const deleteItem = (delId) => {
        const filterArray = Fvalue.filter((ele) => { return ele.id !== delId })
        setFvalue(filterArray);
    }

    const editItem = (editId) => {
        const filterArray = Fvalue.find((ele) => {
            return ele.id === editId;
        })
        setValue(filterArray.name);
        setToggle(true);
        seteditedVal(editId)
    }

    return (
        <>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="✍️ Write Here" aria-label="Recipient's username" aria-describedby="button-addon2" value={Value} onChange={(eve) => { setValue(eve.target.value) }} />
                <button class="btn btn-outline-success" type="button" id="button-addon2" onClick={Add}> {Toggle ? (<i class="fa-solid fa-pen-to-square" ></i>) : (<i class="fa-solid fa-plus"></i>)} </button>
            </div>

            <ul className="list-group">
                {Fvalue.map((ele) => (
                    <li class="list-group-item mb-2 d-flex justify-content-between align-items-center" >
                        {ele.name}
                        <div>
                            <button class="me-1 mb-1 " onClick={() => deleteItem(ele.id)} ><i class="fa-solid fa-trash"></i></button>
                            <button onClick={() => editItem(ele.id)}><i class="fa-solid fa-pen-to-square" ></i></button>
                        </div>
                    </li>
                ))}
            </ul>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
