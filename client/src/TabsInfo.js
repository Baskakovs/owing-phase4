import TabsInfoCard from "./TabsInfoCard"
import { NavLink } from "react-router-dom"
function TabsInfo({onClose, left, selectedTab}){

const {payments} = selectedTab

    return(
        <div className={left ? "container-tabs-half-right justify-content-center" : "display-none"}>
            <button onClick={onClose} className="btn-close"></button>
            <div className="h-a"><h1 className="text-center">Greece Vacation 2023</h1></div>
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