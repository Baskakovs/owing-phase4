//Importing dependencies
import { NavLink } from "react-router-dom"
import { TabContext } from "../App"
import { useContext } from "react"
//Importing components
import TabsInfoCard from "./TabsInfoCard"

function TabsInfo(){
    
    const {handleClose, selectedTab, left} = useContext(TabContext)
    const {payments, name} = selectedTab

    return(
        <div className={left ? "container-tabs-half-right justify-content-center" : "display-none"}>
            <button onClick={handleClose} className="btn-close"></button>
            <div className="h-a"><h1 className="text-center">{name}</h1></div>
            {
                Array.isArray(payments) ? payments.map(payment => <TabsInfoCard key={payment.id} selectedTab={payment}/>) : null
            }
            <NavLink to={`/new_payment`}>
                <div className="text-center">
                    <button className="btn-purple m-a mt-7 m-a w-90">+</button>
                </div>
            </NavLink>
        </div>
    )
}
export default TabsInfo