import IntlCurrencyInput from "react-intl-currency-input"

function NewPayment(){

    
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


    return(
        <>
        <form className={"form"}>
            <input type="text" className={"payment-title"} placeholder="What was the payment?..."/>
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
            <div className="container two-col">
                <input type="date"/>
                <input type="time"/>
            </div>
            <div className="container two-col">
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
        </form>
        <button>Create</button>
        </>
    )
}
export default NewPayment