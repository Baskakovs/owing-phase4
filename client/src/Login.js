import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import duck from './duck.webp'
import React, {useState} from 'react'

function Login({setCurrentUser}){
    const [login, setLogin] = useState(true)
    return(
        <div className="container two-col height-100 align-content-center">
            <div className="m-a">
                {login? <LoginForm setCurrentUser={setCurrentUser}/> : <SignupForm setCurrentUser={setCurrentUser}/>}
                <div className="cntr">
                    <button onClick={()=>setLogin(!login)} className="login-btn">{login ? "Signup" : 
                    "Login"}</button>
                </div>
            </div>
            <div className="m-a">
                <img src={duck}/>
            </div>
        </div>
    )
}
export default Login