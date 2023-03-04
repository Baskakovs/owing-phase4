function TabCard({onTransitionLeft}){

  return(
    <span className="grid-row" onClick={onTransitionLeft}>
        <h3 className="tab-card">Greece Vacation 2023
        </h3>
    </span>
  )   
}
export default TabCard