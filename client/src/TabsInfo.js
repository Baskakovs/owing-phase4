import TabCard from "./TabCard"
function TabsInfo({onClose}){
    return(
        <div className="container-tabs-half-right">
            <button onClick={onClose} className="btn-close"></button>
            <TabCard/>
        </div>
    )
}
export default TabsInfo