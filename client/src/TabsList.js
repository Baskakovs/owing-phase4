import TabCard from "./TabCard"

import React, {useState} from "react"

function Tabs({handleTransitionLeft, left, tabList}){

    return(
        <div className={left ? "container-tabs-half" : "container-tabs"}>
            <h1 className="text-center">Tabs</h1>
            <div>
                {
                    Array.isArray(tabList) ? tabList.map(tab => <TabCard onTransitionLeft={handleTransitionLeft} key={tab.id} tab={tab}/>) : null
                }
            </div>
        </div>
    )
}
export default Tabs