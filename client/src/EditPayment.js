import IntlCurrencyInput from "react-intl-currency-input"
import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

function EditPayment({selectedTab}){

    const currencyConfig = {
        locale: "pt-BR",
        formats: {
          number: {
            BRL: {
              style: "currency",
              currency: "GBP",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
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
                const date = new Date(payment.created_at);
                setForm({
                    id: payment.id,
                    user_id: payment.user_id,
                    created_at: payment.created_at,
                    time: date.toLocaleTimeString([], { hour: '2-digit', minute: 
                    '2-digit' }),
                    date: date.toISOString().substr(0, 10),
                    amount: payment.amount,
                    description: payment.description,
                    category: payment.category
                })
                console.log("original debt format", payment.debts)
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
        convertDebt()
        convertForm()
        fetch(`/payments/${form.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        .then((res)=>{
            if(res.ok){
                console.log(res.json())
            }
        })
    }

    //CONVERTING THE FORM

    function convertForm(){
        //converting the time back to ISO
        const date = new Date(form.date + " " + form.time);
        const isoString = date.toISOString();
        const time = isoString.substr(11, 8); 
        const formattedDateTime = isoString.substr(0, 19) + "Z"; 
        form.created_at = formattedDateTime
        //deleting the time and date from the form
        delete form.time
        delete form.date
        //adding debts to the form
        form.debts = debts
    }

    //CONVERTING DEBT 

    function convertDebt(){
        delete debts.user_name
    }

    function handleSplitEqually(){
        let newDebts = debts.map((debt)=>{
            return {...debt, amount: form.amount / debts.length}
        })
        setDebts(newDebts)
    }

    console.log(form.user_id)


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
                            <IntlCurrencyInput currency="BRL" config={
                                currencyConfig} name={"amount"} value=
                                {form.amount} onChange={handleChange}/>
                            <IntlCurrencyInput currency="BRL" config=
                            {currencyConfig}/>
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
                                        <IntlCurrencyInput id={debt.id} 
                                        currency="BRL" 
                                        config={currencyConfig}
                                        value={debt.amount}
                                        onChange={handleDebtsChange}
                                        />
                                        </div>
                                    )
                                })
                                : null
                            }
                    </div>
                </div>
                <button className="btn-purple m-a mt-7">Update</button>
                <button className="btn-purple m-a mt-7">Delete</button>
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
