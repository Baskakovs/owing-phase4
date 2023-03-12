function TabCard({onTransitionLeft, tab}){

  const {id, name} = tab

  return(
    <span className="grid-row" onClick={()=>onTransitionLeft(id)}>
        <h3 className="tab-card">{name}
        </h3>
    </span>
  )   
}
export default TabCard