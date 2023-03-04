function LoginForm(){
    return(
        <>
        <form className={"form"}>
            <input type="email" name="email" placeholder={"peter@owing.com"}/>
            <input type="password" name="password" placeholder={"password"}/>
                <button type="submit" className="btn-purple">Log In</button>
        </form>
        </>
    )
}

export default LoginForm