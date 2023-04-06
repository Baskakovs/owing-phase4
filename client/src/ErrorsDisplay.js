import { useState } from "react"

function ErrorsDisplay({errors}){
    return (
        Array.isArray(errors) && errors.length > 0 ?
        <div className="container">
            <div className='login-error-box w-366 m-a'>
                <ul className='errors-list'>{Array.isArray(errors) ? 
                errors.map((error)=>{
                    return <li className='errors-list-item'>{error}</li>
                    }): null}
                </ul> 
            </div>
        </div>
        :
        null
    )
}

export default ErrorsDisplay