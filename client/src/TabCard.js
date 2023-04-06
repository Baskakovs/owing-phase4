function TabCard({handleTransitionLeft, tab}){

  const {id, name} = tab

  return(
    <span className="grid-row" onClick={()=>handleTransitionLeft(id)}>
        <h3 className="tab-card">{name}</h3>
    </span>
  )   
}
export default TabCard