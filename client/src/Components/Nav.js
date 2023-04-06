function Nav({handleLogout}){
    return (
        <>
        <ul className="ul-nav">
            <li className="nav-li">
            <button className={"btn-purple"} onClick=
            {handleLogout}>Logout</button>
            </li>
        </ul>
        </>
    )
}
export default Nav