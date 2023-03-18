import MoneysInput from "./MoneysInput";
import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

function EditPayment({selectedTab, handleUpdateTab}){

    const currencyConfig = {
        locale: "pt-BR",
        formats: {
          number: {
            BRL: {
              style: "currency",
              currency: "GBP",
              minimumFractionDigits: 1,
              maximumFractionDigits: 3,
            },
          },
        },
      };

    //FILTEREING OUT THE RIGHT PAYMENT FROM THE SELECTED TAB DATA

    const params = useParams()
    const [form, setForm] = useState("")
    const [selectedUser, setSelectedUser] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [debts, setDebts] = useState([])
    const [paymentDebts, setPaymentDebts] = useState([])

    useEffect(() => {
        selectedTab.payments.filter((payment)=>{
            if(payment.id == params.id){
                let dateO = new Date(payment.created_at);
                let timeO = new Date(payment.created_at);
                setForm({
                    id: payment.id,
                    user_id: payment.user_id,
                    created_at: payment.created_at,
                    amount: payment.amount,
                    description: payment.description,
                    category: payment.category,
                    date: dateO.toISOString().slice(0, 10).toString(),
                    time: timeO.toLocaleTimeString([], { hour: '2-digit', 
                    minute: '2-digit' }).toString(),
                })
                setAllUsers(payment.users)
                setSelectedUser(payment.user)
                setPaymentDebts(payment.debts)
            }
        })},
    [selectedTab])

    //SETTING THE DEBTS

    useEffect(() => {
        let newDebts = [];
        paymentDebts.map((debt) => {
          allUsers.map((user) => {
            if (debt.user_id == user.id) {
            newDebts.push({ id: debt.id,user_name: user.name, user_id: 
            user.id, amount: debt.amount, payment_id: debt.payment_id });
            }
          });
        });
        setDebts(newDebts);
      }, [allUsers, paymentDebts]);

    //HANDLING THE DEBTS

    function handleDebtsChange(e) {
        let newDebts = debts.map((debt) => {
          if (debt.id == e.target.id) {
            return { ...debt, amount: e.target.value };
          } else {
            return debt;
          }
        });
        setDebts(newDebts);
      }

    //HANDLING THE FORM INPUTS

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //EMOJIS

    const EMOJIS = {plane: "✈️", food: "🌮️", medicne: "💊", entertainment: "💃", taxi: "🚕", drink: "🍺", energy: "⚡", cash: "💰"}


    //HANDLING THE UPDATE

    function handleUpdate(e){
        e.preventDefault()
        bodyConvert()
        fetch(`/payments/${form.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        .then((res)=>{
            if(res.ok){
                res.json().then(data=>{
                    handleUpdateTab(data)
                })
            }
        })
    }

    //CONVERTING THE FORM

    function bodyConvert(){
        //converting the time back to ISO
        const date = new Date(`${form.date} ${form.time}`);
        const isoString = date.toISOString();
        const formattedDateTime = isoString.slice(0, 19).replace(".", "") + 
        "Z"; 
        form.created_at = formattedDateTime
        form.debts = debts
    }


    function handleSplitEqually(){
        let newDebts = debts.map((debt)=>{
            return {...debt, amount: form.amount / debts.length}
        })
        setDebts(newDebts)
    }

    function handleDeletePayment(){
        fetch(`/payments/${form.id}`, {
            method: "DELETE",
        })
        .then((res)=>{
            if(res.ok){
                res.json().then(data=>{
                    console.log("deleted")
                })
            }
        })
    }

    return(
        <>
        <form className={"form"} onSubmit={handleUpdate}>
        <input type="text" name={"description"} className={"payment-title"} 
        onChange={handleChange} value={form.description}/>
            <div className="container justify-content-center">
                <div className="container two-col col-gap-7">
                    <div>
                    <select value={form.user_id} name={"user_id"} onChange=
                    {handleChange}>
                        {Array.isArray(allUsers) ? allUsers.map((user) => {
                            return (
                                <option value={user.id} key={user.id}>
                                    {`${user.name}`}
                                </option>
                            )
                            })
                        : null}
                    </select>
                        <div className="container two-col col-gap-7">
                        <input type="date" name="date" value={form.date} 
                        onChange={handleChange} placeholder="Select a date" />
                        <input type="time" name={"time"} value={form.time} 
                        onChange={handleChange}/>
                        </div>
                        <div className="container two-col col-gap-7">
                            <div>
                            <MoneysInput name={"amount"} value={form.amount} 
                                onChange={handleChange}/>
                            </div>
                            <div>
                            <MoneysInput name={"amount"} value={form.amount} 
                                onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="container four-col">
                            {
                                Object.values(EMOJIS).map((emoji) => 
                                    {
                                        let value;
                                        Object.keys(EMOJIS).find((key) => {
                                            if (EMOJIS[key] === emoji) {
                                            value = key;
                                    }
                                });
                                return (
                                <label className="checkbox-with-emoji" key=
                                {emoji}>
                                {form.category == value ?
                                <input
                                type="checkbox"
                                name="category"
                                value={value}
                                onChange={handleChange}
                                checked
                                /> :
                                <input
                                type="checkbox"
                                name="category"
                                value={value}
                                onChange={handleChange}
                                />
                                }
                                <span className="checkmark">{emoji}</span>
                                </label>
                                );
                                })
                            }
                        </div>
                    </div>
                    <div className="container">
                            <button className="btn-split mb-7" onClick=
                            {handleSplitEqually}>Split 
                            Equally</button>
                            {
                                Array.isArray(debts) ? debts.map((debt) => 
                                {
                                    return (
                                        <div class="input-wrapper">
                                        <label for="amountInput">
                                            {debt.user_name}
                                        </label>
                                            <div>
                                                <MoneysInput id={debt.id} 
                                                name="debt" value=
                                                {debt.amount} 
                                                onChange={handleDebtsChange}/>
                                            </div>
                                        </div>
                                    )
                                })
                                : null
                            }
                    </div>
                </div>
                <button className="btn-purple m-a mt-7">Update</button>
                <button onClick={handleDeletePayment} className="btn-split mb-7">Delete</button>
            </div>
        </form>
        </>
    )
}
export default EditPayment

// Inside the Payment API we have debts [user_id, amount] and we have users (includes name, user id)
    // We need to create a new array with the users and the amount they owe
    //On change of amount they owe we change the array
    //On change of user we remove the user selected from the owing array and add the unselected user witht the amount he owes
