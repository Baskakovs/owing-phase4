import TabsInfoCard from "./TabsInfoCard"
function TabsInfo({onClose, left}){
    return(
        <div className={left ? "container-tabs-half-right justify-content-center" : "display-none"}>
            <button onClick={onClose} className="btn-close"></button>
            <div className="h-a"><h1 className="text-center">Greece Vacation 2023</h1></div>
            <TabsInfoCard/>
            <TabsInfoCard/>
            <TabsInfoCard/>
        </div>
    )
}
export default TabsInfo