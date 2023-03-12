import TabsInfoCard from "./TabsInfoCard"
function TabsInfo({onClose, left, selectedTab}){
console.log(selectedTab)

const {payments} = selectedTab

    return(
        <div className={left ? "container-tabs-half-right justify-content-center" : "display-none"}>
            <button onClick={onClose} className="btn-close"></button>
            <div className="h-a"><h1 className="text-center">Greece Vacation 2023</h1></div>
            {
                Array.isArray(payments) ? payments.map(payment => <TabsInfoCard key={payment.id} selectedTab={payment}/>) : null
            }
        </div>
    )
}
export default TabsInfo