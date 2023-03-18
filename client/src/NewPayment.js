import MoneysInput from "./MoneysInput";
import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

function EditPayment({selectedTab, handleNewPayment}){

    const {users} = selectedTab
    let debtUserList = []
    users.map((user)=>{
        debtUserList.push({user_id: user.id, user_name: user.name, amount: 0.0})
    })
    const [debts, setDebts] = useState(debtUserList)
    const params = useParams(debtUserList)
    const [form, setForm] = useState({user_id: String(selectedTab.users[0].id), 
    tab_id: selectedTab.id})

    //HANDLING THE DEBTS

    function handleDebtsChange(e) {
        let newDebts = debts.map((debt) => {
          if (debt.user_id == e.target.id) {
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

    const EMOJIS = {plane: "✈️", food: "🌮️", medicne: "💊", entertainment: "💃", 
    taxi: "🚕", drink: "🍺", energy: "⚡", cash: "💰"}

    function handleCreate(){
        return null
    }

    function handleDebts(e){
        let newDebts = debts.map((debt)=>{
            if(debt.user_id == e.target.id){
                return {...debt, amount: e.target.value}
            }else{
                return debt
            }
        })
        setDebts(newDebts)
    }

    function handleSplitEqually(e){
        e.preventDefault()
        let newDebts = debts.map((debt)=>{
            return {...debt, amount: form.amount / users.length}
        })
        setDebts(newDebts)
    }

    //HANDLING THE SUBMIT

    function handleCreate(e){
        e.preventDefault()
        bodyConvert()
        fetch(`/payments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        .then((res)=>{
            if(res.ok){
                res.json().then(data=>{
                    handleNewPayment(data)
                })
            }
        })
    }

    //CONVERTING THE FORM

    function bodyConvert(){
        //converting the time back to ISO
        const date = new Date(`${form.date} ${form.time}`);
        console.log(date, "1")
        const isoString = date.toISOString();
        console.log(isoString, "2")
        const formattedDateTime = isoString.slice(0, 19).replace(".", "") + 
        "Z"; 
        form.created_at = formattedDateTime
        form.debts = debts
    }

    return(
        <>
        <form className={"form"} onSubmit={handleCreate}>
        <input type="text" name={"description"} className={"payment-title"} 
        onChange={handleChange} placeholder={"What was the payment...?"} value=
        {form.description} 
        autoFocus/>
            <div className="container justify-content-center">
                <div className="container two-col col-gap-7">
                    <div>
                    <select value={form.user_id} name={"user_id"} onChange=
                    {handleChange}>
                        {Array.isArray(users) ? users.map((user) => {
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
                                                <MoneysInput id={debt.user_id} 
                                                value={debt.amount} 
                                                onChange={handleDebtsChange}/>
                                            </div>
                                        </div>
                                    )
                                })
                                : null
                            }
                    </div>
                </div>
                <button className="btn-purple m-a mt-7">Create</button>
            </div>
        </form>
        </>
    )
}
export default EditPayment

