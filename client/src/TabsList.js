import TabCard from "./TabCard"
import React, {useContext} from "react"
import {TabContext} from "./App"
import {NavLink} from "react-router-dom"

function Tabs(){

    const {handleTransitionLeft, data, left} = 
    useContext(TabContext)

    return(
        <div className={left ? "container-tabs-half" : "container-tabs"}>
            <h1 className="text-center">Tabs</h1>
            <div>
                {
                    Array.isArray(data) ? data.map(tab => <TabCard 
                    handleTransitionLeft={handleTransitionLeft} key={tab.id} tab={tab}/>) : null
                }
                <NavLink to={`/new_tab`}>
                    <div className="text-center">
                        <button className="btn-purple m-a mt-7 m-a w-90">
                            +
                        </button>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
export default Tabs