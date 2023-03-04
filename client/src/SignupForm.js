function SignupForm(){
    return(
        <>
        <form className={"form"}>
            <input type="email" name="email" placeholder={"peter@owing.com"}/>
            <input type="text" name="name" placeholder={"name"}/>
            <input type="password" name="password" placeholder={"password"}/>
            <input type="password" name="confirmPassword" placeholder={"confirm password"} className={"formCell"}/>
            <button type="submit" className="btn-purple">Sign Up</button>
        </form>
        </>
    )
}

export default SignupForm