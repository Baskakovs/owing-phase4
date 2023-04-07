//Importing dependencies
import { useHistory } from "react-router-dom"
import { useState } from "react"
//Importing components
import ErrorsDisplay from "./ErrorsDisplay"

function NewTab({handleNewTab}){
    const history = useHistory()
    function goBack(){
        history.goBack()
    }

    //HANDLING FORM INPUTS
    //====================
    const [form, setForm] = useState({
        name: "",
        user1: "",
        user2:"",
        user3: "",
    })

    function handleChange(e){
        let name = e.target.name
        let value = e.target.value
        setForm({
            ...form,
            [name]: value
        })
    }

    //Setting the errors
    const [errors, setErrors] = useState([])

    //SUBMITTING THE FORM TO THE BACKEND
    //==================================
    function handleSubmit(e){
        e.preventDefault()
        fetch(`/tabs`,{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(form)
        })
        .then((res)=>{
            if(res.ok){
                res.json().then((data)=>{
                    handleNewTab(data)
                    history.push(`/`)
                })
            }else{
                res.json().then((e)=>setErrors(e.errors))
            }
        })
    }

    return(
        <div className="container align-content-center">
        <button onClick={goBack} className="btn-close"></button>
        <form className={"form"} onSubmit={handleSubmit}>
            <input type="text" name={"name"} className={"payment-title"} 
            onChange={handleChange} value={form.name} placeholder={"Name the tab..."}
            autoFocus/>
            <div className="container justify-content-center">
                    <div className="container">
                        <h4>Send invitations to join the tab</h4>
                        <label>User 1</label>
                        <div className="container position-relative">
                            <input  id={"inputLabel"} name={"user1"} value={form.user1} onChange={handleChange} placeholder={"Email..."}/>
                        </div>
                        <label>User 2</label>
                        <div className="container position-relative">
                            <input type="email" id={"inputLabel"} name={"user2"}value={form.user2} onChange={handleChange} placeholder={"Email..."}/>
                        </div>
                        <label>User 3</label>
                        <div className="container position-relative">
                            <input type="email" id={"inputLabel"} name={"user3"} value={form.user3} onChange={handleChange} placeholder={"Email..."}/>
                        </div>
                        <div className="container position-relative">
                        </div>
                </div>
                <h4>Currencies Selection</h4>
                <div className="container two-col col-gap-7">
                    <div>
                        <label>Primary Currency</label>
                        <select name="primary-currency">
                            <option value={"GBP"} defaultValue>GBP</option>
                            <option value={"GBP"}>EUR</option>
                            <option value={"GBP"}>USD</option>
                        </select>
                    </div>
                    <div>
                    <label>Secondary Currency</label>
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
        <ErrorsDisplay errors={errors}/>
        </div>
    )
}
export default NewTab