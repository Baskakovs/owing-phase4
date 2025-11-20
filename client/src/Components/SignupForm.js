//Importing dependencies
import React, {useState, useContext} from 'react'
import {LoginContext} from '../App'

function SignupForm({setErrors}){

    const {setCurrentUser} = useContext(LoginContext)

    //HANDLING FORM INPUTS
    //====================
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
    })

    function handleChange(e){
        e.preventDefault()
        let name = e.target.name
        let value = e.target.value
        setSignUpForm({
            ...signUpForm, [name]: value
        })
        setErrors([])
    }

    //SUBMITTING SIGNUP TO THE BACK-END
    //=================================
    function handleSubmit(e){
        e.preventDefault()
        const isValid = validateInputs()
        if(isValid){
            fetch('/users',{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({
                    email: signUpForm.email,
                    name: signUpForm.name,
                    password: signUpForm.password
                })
            })
            .then(res => {
                if(res.ok){
                    res.json().then(user => setCurrentUser(user))
                }else{
                    res.json().then(e =>setErrors(e.errors))
                }
            })
        }
    }

    //Validating Inputs
    function validateInputs(){
        let errors = []
        //Validate password - allow any special character, not just specific ones
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
        if(!passwordRegex.test(signUpForm.password)){
            errors.push("Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character")
        }
        if(signUpForm.password !== signUpForm.confirmPassword){
            errors.push("Passwords do not match")
        }
        setErrors(errors)
        return errors.length === 0
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