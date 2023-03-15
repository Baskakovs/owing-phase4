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

    useEffect(() => {
        selectedTab.payments.filter((payment)=>{
            if(payment.id == params.id){
                const date = new Date(payment.created_at);
                setForm({
                    id: payment.id,
                    user_id: payment.user_id,
                    time: date.toLocaleTimeString([], { hour: '2-digit', minute: 
                    '2-digit' }),
                    date: date.toISOString().substr(0, 10),
                    amount: payment.amount,
                    description: payment.description
                })
                console.log("the one" ,payment.user)
                setAllUsers(payment.users)
                setSelectedUser(payment.user)
            }
        })},
    [selectedTab])

    //SETTING THE PAYER

    function changePayer(e){
        let newAllUserList = allUsers.filter((user) => user.id != 
        e.target.value)
        let newSelectedUser = allUsers.find((user) => user.id == 
        e.target.value)
        setAllUsers([...newAllUserList, selectedUser])
        setSelectedUser(newSelectedUser)
        handleChange(e)
    }

    
    console.log("selected", selectedUser)
    //HANDLING THE FORM INPUTS

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //EMOJIS

    const EMOJIS = {plane: "✈️", food: "🌮️", medicne: "💊", entertainment: "💃", taxi: "🚕", drink: "🍺", energy: "⚡", cash: "💰"}


    return(
        <>
        <form className={"form"}>
        <input type="text" name={"description"} className={"payment-title"} 
        onChange={handleChange} value={form.description}/>
            <div className="container justify-content-center">
                <div className="container two-col col-gap-7">
                    <div>
                    <select value={form.user_id} name={"user_id"} onChange=
                    {changePayer}>
                        { selectedUser != null ?
                            <option value={selectedUser.id}>{selectedUser.name}
                            </option>
                            :
                            null
                        }
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
                            <button className="btn-split mb-7">Split 
                            Equally</button>
                            <div class="input-wrapper">
                                <label for="amountInput">Peter</label>
                                <IntlCurrencyInput id="amountInput" 
                                currency="BRL" 
                                config={currencyConfig}/>
                            </div>

                    </div>
                </div>
                <button className="btn-purple m-a mt-7">Create</button>
            </div>
        </form>
        </>
    )
}
export default EditPayment