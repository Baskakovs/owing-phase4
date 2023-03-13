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

    useEffect(() => {
        selectedTab.payments.filter((payment)=>{
            if(payment.id == params.id){
                setForm({
                    id: payment.id,
                    user_id: payment.user_id,
                    created_at: payment.created_at,
                    amount: payment.amount,
                    description: payment.description
                })
            }
        })},
    [])


    //HANDLING THE FORM INPUTS

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    console.log(form)
    return(
        <>
        <form className={"form"}>
        <input type="text" name={"description"} className={"payment-title"} onChange={handleChange} value={form.description}/>
            <div className="container justify-content-center">
                <div className="container two-col col-gap-7">
                    <div>
                    {/* <select name='user_id' value={data.user_id} onChange=
                        // {onChange}>
                        // {Array.isArray(users) ? users.map((user)=>{
                        //     return (
                        //         <option key={uuidv4()} value={user.id}>
                        //             {`${user.first_name} .${user.last_name[0]}`}
                        //         </option>)
                        //     })
                        // :null}
                    </select> */}
                        <select className="" name="" id="">
                            <option value="Name">Peter B.</option>
                        </select>
                        <div className="container two-col col-gap-7">
                            <input type="date"/>
                            <input type="time"/>
                        </div>
                        <div className="container two-col col-gap-7">
                            <IntlCurrencyInput currency="BRL" config={currencyConfig}/>
                            <IntlCurrencyInput currency="BRL" config={currencyConfig}/>
                        </div>
                        <div className="container four-col">
                            <label className="checkbox-with-emoji">
                                <input type="checkbox"/>
                                <span className="checkmark">🌮</span>
                            </label>
                            <label className="checkbox-with-emoji">
                                <input type="checkbox"/>
                                <span className="checkmark">🌮</span>
                            </label>
                            <label className="checkbox-with-emoji">
                                <input type="checkbox"/>
                                <span className="checkmark">🌮</span>
                            </label>
                            <label className="checkbox-with-emoji">
                                <input type="checkbox"/>
                                <span className="checkmark">🌮</span>
                            </label>
                            <label className="checkbox-with-emoji">
                                <input type="checkbox"/>
                                <span className="checkmark">🌮</span>
                            </label>
                            <label className="checkbox-with-emoji">
                                <input type="checkbox"/>
                                <span className="checkmark">🌮</span>
                            </label>
                            <label className="checkbox-with-emoji">
                                <input type="checkbox"/>
                                <span className="checkmark">🌮</span>
                            </label>
                            <label className="checkbox-with-emoji">
                                <input type="checkbox"/>
                                <span className="checkmark">🌮</span>
                            </label>
                        </div>
                    </div>
                    <div className="container">
                            <button className="btn-split mb-7">Split Equally</button>
                            <div class="input-wrapper">
                                <label for="amountInput">Peter</label>
                                <IntlCurrencyInput id="amountInput" currency="BRL" 
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