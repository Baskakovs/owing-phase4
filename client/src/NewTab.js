import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
function NewTab(){
    const history = useHistory()
    function goBack(){
        history.goBack()
    }

    const [form, setForm] = useState({
        description: ""
    })
    const [numUsers, setNumUsers] = useState(1)

    function handleChange(e){
        let name = e.target.name
        let value = e.target.value
        setForm({
            ...form,
            [name]: value
        })
    }

    function addUserInput(){
        const inputs = Array(numUsers).fill()
        return inputs.map((_, index) => (
            <div className="container position-relative">
                <input id={"inputLabel"} type="email" name={"email"} 
                placeholder=
                {"Email..."}/>
                <button onClick={goBack} className="btn-delete-user"></button>
            </div>
        ));
    }

    useEffect(() => {
        {
            addUserInput()
        }
    }, [numUsers])

    function removeUser(){
    }

    return(
        <>
        <button onClick={removeUser} className="btn-close"></button>
        <form className={"form"}>
            <input type="text" name={"description"} className={"payment-title"} 
            onChange={handleChange} value={form.description} placeholder={"Name the tab..."}
            autoFocus/>
            <div className="container justify-content-center">
                <div className="container">
                    {addUserInput()}
                    <button className="btn-purple m-a mt-7 m-a w-
                    100" onClick={(e)=>{
                        e.preventDefault()
                        setNumUsers(numUsers+1)
                        }}>
                        Add User
                    </button>
                </div>
            </div>
        </form>
        

        </>
    )
}
export default NewTab