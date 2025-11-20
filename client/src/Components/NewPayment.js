//Importing dependencies
import React, {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import uuid from "react-uuid";
//Importing components
import ErrorsDisplay from "./ErrorsDisplay";
import Categories from "./Categories";

function EditPayment({selectedTab, handleNewPayment}){

    const [debts, setDebts] = useState()
    const {users} = selectedTab

    //SETTING THE DEBTS STATE
    //=======================
    useEffect(()=>{
        let debtUserList = []
        users.map((user)=>{
            return debtUserList.push({user_id: user.id, user_name: user.name, amount: ""})
        })
        setDebts(debtUserList)
    }, [users])

    const [form, setForm] = useState({user_id: String(selectedTab.users[0].id), 
    tab_id: selectedTab.id, amount: "", amount_secondary: ""})
    
    // Currency conversion - using default rates (can be made dynamic later)
    const exchangeRates = {
        'USD_EUR': 0.92,
        'EUR_USD': 1.09,
        'GBP_USD': 1.27,
        'USD_GBP': 0.79,
        'GBP_EUR': 1.16,
        'EUR_GBP': 0.86
    }
    
    // Get currencies from tab or use defaults
    const primaryCurrency = selectedTab.primary_currency || 'USD'
    const secondaryCurrency = selectedTab.secondary_currency || 'EUR'
    const currencySymbols = { 'USD': '$', 'EUR': '€', 'GBP': '£' }

    //HANDLING THE DEBTS
    //==================

    function handleDebtsChange(e) {
        let newDebts = debts.map((debt) => {
          if (parseFloat(debt.user_id) === parseFloat(e.target.id)) {
            return { ...debt, amount: e.target.value };
          } else {
            return debt;
          }
        });
        setDebts(newDebts);
      }

    //HANDLING THE FORM INPUTS
    //========================

    function handleChange(e){
        let name = e.target.name
        let value = e.target.value
        setForm({
            ...form,
            [name]: value
        })

        // Auto-convert between currencies
        if(name === "amount" && value) {
            const rate = exchangeRates[`${primaryCurrency}_${secondaryCurrency}`] || 1
            const converted = (parseFloat(value) * rate).toFixed(2)
            setForm(prev => ({...prev, amount_secondary: converted}))
        } else if(name === "amount_secondary" && value) {
            const rate = exchangeRates[`${secondaryCurrency}_${primaryCurrency}`] || 1
            const converted = (parseFloat(value) * rate).toFixed(2)
            setForm(prev => ({...prev, amount: converted}))
        }

        //Clearing the errors when the user starts typing date, time or description
        if(name === "date" || name === "time" || name === "description")
        {setErrors([])}
    }

    function handleSplitEqually(e){
        e.preventDefault()
        const amountToSplit = parseFloat(form.amount) || 0
        if(amountToSplit > 0) {
            let newDebts = debts.map((debt)=>{
                return {...debt, amount: (amountToSplit / users.length).toFixed(2)}
            })
            setDebts(newDebts)
        }
    }

    //HANDLING THE SUBMIT
    //===================

    const [errors, setErrors] = useState([])

    function handleCreate(e){
        e.preventDefault()
        if(bodyConvert() === true){
            fetch(`/payments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify(form)
            })
            .then((res)=>{
                if(res.ok){
                    res.json().then(data=>{
                        handleNewPayment(data)
                        navigate('/')
                    }
                    )
                }else{
                    res.json().then((e)=>{ setErrors(e.errors)})
                }
            })
        }
    }

    //Converting the form data to the format that the backend is expecting

    function bodyConvert(){
        if(form.date !== undefined && form.time !== undefined){
            //converting the time back to ISO
            const date = new Date(`${form.date} ${form.time}`);
            const isoString = date.toISOString();
            const formattedDateTime = isoString.slice(0, 19).replace(".", "") + 
            "Z"; 
            form.created_at = formattedDateTime
            form.debts = debts
            return true
        }else{
            const newErrors = ["Please select date and time."];
            setErrors(newErrors);
            return false
        }
    }

    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return(
        <>
        <button onClick={goBack} className="btn-close"></button>
        <form className={"form"} onSubmit={handleCreate}>
        <input type="text" name={"description"} className={"payment-title"} 
        onChange={handleChange} placeholder={"What was the payment...?"} value=
        {form.description} 
        autoFocus/>
            <div className="container justify-content-center">
                <div className="container two-col col-gap-7">
                    <div>
                    <select value={form.user_id} name={"user_id"} onChange={handleChange}>
                        {Array.isArray(users) ? users.map((user) => {
                            return (
                                <option value={user.id} key={uuid()}>
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
                                <label>{primaryCurrency} Amount</label>
                                <div className="currency-wrap">
                                    <span className="currency-code">{currencySymbols[primaryCurrency] || '$'}</span>
                                    <input className="text-currency" name={"amount"} 
                                    value={form.amount} onChange={handleChange} 
                                    placeholder="Enter amount" />
                                </div>
                            </div>
                            <div>
                                <label>{secondaryCurrency} Amount</label>
                                <div className="currency-wrap">
                                    <span className="currency-code">{currencySymbols[secondaryCurrency] || '€'}</span>
                                    <input className="text-currency" name={"amount_secondary"} 
                                    value={form.amount_secondary} onChange={handleChange} 
                                    placeholder="Auto-converted" />
                                </div>
                            </div>
                        </div>
                        <div className="container four-col">
                            <Categories handleChange={handleChange} key={ uuid()} form={form}/>
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
                                            <div className="input-wrapper" key=
                                            {debt.id}>
                                                <label>
                                                    {debt.user_name}
                                                </label>
                                                <div>
                                                <div className="currency-wrap">
                                                    <span 
                                                    className="currency-code">$</span>
                                                    <input 
                                                    className="text-currency" 
                                                    name={"amount"} 
                                                    value={debt.amount} 
                                                    id={debt.user_id}
                                                    onChange={handleDebtsChange} 
                                                    key={debt.id}
                                                    />
                                                </div>
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
        <ErrorsDisplay errors={errors}/>
        </>
    )
}
export default EditPayment