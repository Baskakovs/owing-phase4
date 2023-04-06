import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import duck from './duck.webp'
import React, {useState, useEffect} from 'react'

function Login({setCurrentUser}){

    const [errors, setErrors] = useState([])
    const [login, setLogin] = useState(true)

    useEffect(()=>{setErrors()},[login])

    function handleSetErrors(errors){
        setErrors(errors)
    }

    console.log(errors)
    
    return(
        <div className="container two-col height-100 align-content-center">
            <div className="m-a">
                {login? <LoginForm setCurrentUser={setCurrentUser} setErrors={setErrors}/> : <SignupForm setCurrentUser={setCurrentUser} setErrors={setErrors}/>}
                <div className="cntr">
                    <button onClick={()=>setLogin(!login)} className="login-btn">{login ? "Signup" : 
                    "Login"}
                    </button>
                    {
                        Array.isArray(errors) && errors.length > 0 ?
                        <div className='login-error-box'>
                            <ul className='errors-list'>{Array.isArray(errors) ? errors.map((error)=>{
                                return <li className='errors-list-item'>{error}</li>
                                }): null}
                            </ul> 
                         </div>
                         :
                        null
                    }
                </div>
            </div>
            <div className="m-a">
                <img src={duck}/>
            </div>
        </div>
    )
}
export default Login