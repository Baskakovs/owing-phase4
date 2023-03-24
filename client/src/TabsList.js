import TabCard from "./TabCard"

import React, {useState} from "react"
import {NavLink} from "react-router-dom"

function Tabs({handleTransitionLeft, left, tabList}){

    return(
        <div className={left ? "container-tabs-half" : "container-tabs"}>
            <h1 className="text-center">Tabs</h1>
            <div>
                {
                    Array.isArray(tabList) ? tabList.map(tab => <TabCard onTransitionLeft={handleTransitionLeft} key={tab.id} tab={tab}/>) : null
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