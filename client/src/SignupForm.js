import React, {useState} from 'react'
function SignupForm({setCurrentUser}){

    console.log(setCurrentUser)

    const [signUpForm, setSignUpForm] = useState({
        email: "",
        name: "",
        password: "",
        // confirmPassword: ""
    })

    const [errors, setErrors] = useState([])

    function handleChange(e){
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setSignUpForm({
            ...signUpForm, [name]: value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch('/users',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signUpForm)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => setCurrentUser(user))
            }else{
                res.json().then(errors => setErrors(errors.errors))
            }
        })
    }

    return(
        <>
        <form className={"form"} onSubmit={handleSubmit}>
            <div className="container">
                <input type="email" onChange={handleChange} name="email" placeholder={"peter@owing.com"}/>
                <input type="text" onChange={handleChange} name="name" placeholder={"name"}/>
                <input type="password" onChange={handleChange} name="password" placeholder={"password"}/>
                <input type="password" onChange={handleChange} name="confirmPassword" placeholder={"confirm password"} className={"formCell"}/>
                <button type="submit" className="btn-purple mt-7">Sign Up</button>
            </div>
        </form>
        </>
    )
}

export default SignupForm