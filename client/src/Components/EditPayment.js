import MoneysInput from "./MoneysInput";
import ErrorsDisplay from "./ErrorsDisplay";
import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"

function EditPayment({selectedTab, handleUpdateTab, handleDeletePayment}){

    //FILTEREING OUT THE RIGHT PAYMENT FROM THE SELECTED TAB DATA

    const params = useParams()
    const [form, setForm] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [debts, setDebts] = useState([])
    const [paymentDebts, setPaymentDebts] = useState([])
    
    useEffect(() => {
        if(Array.isArray(selectedTab.payments)){
            selectedTab.payments.filter((payment)=>{
                if(parseFloat(payment.id) === parseFloat(params.id)){
                    let dateO = new Date(payment.created_at);
                    let timeO = new Date(payment.created_at);
                    setForm({
                        tab_id: selectedTab.id,
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
                    setPaymentDebts(payment.debts)
                }
                return null
            })
        }
        },
    [selectedTab, params.id])

    //SETTING THE DEBTS

    useEffect(() => {
        let newDebts = [];
        paymentDebts.map((debt) => {
          allUsers.map((user) => {
            if (parseFloat(debt.user_id) === parseFloat(user.id)) {
            newDebts.push({ id: debt.id,user_name: user.name, user_id: 
            user.id, amount: debt.amount, payment_id: debt.payment_id });
            }
            return null
          });
          return null
        });
        setDebts(newDebts);
      }, [allUsers, paymentDebts]);

    //HANDLING THE DEBTS

    function handleDebtsChange(e) {
        let newDebts = debts.map((debt) => {
          if (parseFloat(debt.id) === parseFloat(e.target.id)) {
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

    //HANDLING THE UPDATE

    const [errors, setErrors] = useState([])

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
                    history.push("/")
                })
            }else{
                res.json().then((e)=>{setErrors(e.errors)})
            }
        })
    }

    //HANDLING THE DELETE

    function onhandleDeletePayment(){
        fetch(`/payments/${form.id}`, {
            method: "DELETE",
        })
        .then((res)=>{
            if(res.ok){
                console.log("ok")
                handleDeletePayment(form.id, form.tab_id)
            }
        })
    }

    const history = useHistory();

    function goBack() {
        history.goBack();
    }

    return(
        <div>
        <button onClick={goBack} className="btn-close"></button>
        <div className="justify-content-center mt-15">
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
                                        return null
                                    });
                                    return (
                                    <label className="checkbox-with-emoji" key=
                                    {emoji}>
                                    {form.category === value ?
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
                                            <div className="input-wrapper">
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
                    <button onClick={onhandleDeletePayment} className="btn-split mb-7">Delete</button>
                </div>
            </form>
        </div>
        <ErrorsDisplay errors={errors}/>
        </div>
    )
}
export default EditPayment