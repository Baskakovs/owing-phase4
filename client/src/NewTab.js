import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import MoneysInput from "./MoneysInput";
function NewTab(){
    const history = useHistory()
    function goBack(){
        history.goBack()
    }

    const [form, setForm] = useState({
        description: "",
        user1: "",
        user2:"",
        user3: "",
        user4: "",
        user5: "",
        user6: "",
    })

    function handleChange(e){
        let name = e.target.name
        let value = e.target.value
        setForm({
            ...form,
            [name]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/tabs`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(form)
        })
    }



    return(
        <>
        <button onClick={goBack} className="btn-close"></button>
        <form className={"form"} onSubmit={handleSubmit}>
            <input type="text" name={"description"} className={"payment-title"} 
            onChange={handleChange} value={form.description} placeholder={"Name the tab..."}
            autoFocus/>
            <div className="container justify-content-center">
                    <div className="container">
                        <h4>Send invitations to join the tab</h4>
                        <label>User 1</label>
                        <div className="container position-relative">
                            <input id={"inputLabel"} name={"user1"} value={form.user1} onChange={handleChange} placeholder={"Email..."}/>
                        </div>
                        <label>User 2</label>
                        <div className="container position-relative">
                            <input id={"inputLabel"} name={"user2"}value={form.user2} onChange={handleChange} placeholder={"Email..."}/>
                        </div>
                        <label>User 3</label>
                        <div className="container position-relative">
                            <input id={"inputLabel"} name={"user3"} value={form.user3} onChange={handleChange} placeholder={"Email..."}/>
                            {/* <button className="btn-delete-user"></button> */}
                        </div>
                        <div className="container position-relative">
                        </div>
                </div>
                <h4>Currencies Selection</h4>
                <div className="container two-col col-gap-7">
                    <div>
                        <label for="primary-currency">Primary Currency</label>
                        <select name="primary-currency">
                            <option value={"GBP"} defaultValue>GBP</option>
                            <option value={"GBP"}>EUR</option>
                            <option value={"GBP"}>USD</option>
                        </select>
                    </div>
                    <div>
                    <label for="primary-currency">Secondary Currency</label>
                        <select name="primary-currency">
                            <option value={"GBP"}>GBP</option>
                            <option value={"GBP"} defaultValue>EUR</option>
                            <option value={"GBP"}>USD</option>
                        </select>
                    </div>
                </div>
                <button className="btn-purple m-a mt-7">Create</button>
            </div>
        </form>
        

        </>
    )
}
export default NewTab