import TabCard from "./TabCard"

import React, {useState} from "react"

function Tabs({handleTransitionLeft, left}){


    return(
        <div className={left ? "container-tabs-half" : "container-tabs"}>
            <h1 className="text-center">Tabs</h1>
            <div>
                <TabCard onTransitionLeft={handleTransitionLeft}/>
                <TabCard/>
                <TabCard/>
                <TabCard/>
                <TabCard/>
                <TabCard/>
                <TabCard/>
                <TabCard/>
                <TabCard/>
                <TabCard/>
            </div>
        </div>
    )
}
export default Tabs