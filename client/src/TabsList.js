import TabCard from "./TabCard"

import React, {useState} from "react"

function Tabs({handleTransitionLeft, left, tabList}){

    console.log(tabList)
    return(
        <div className={left ? "container-tabs-half" : "container-tabs"}>
            <h1 className="text-center">Tabs</h1>
            <div>
                <TabCard onTransitionLeft={handleTransitionLeft}/>
            </div>
        </div>
    )
}
export default Tabs