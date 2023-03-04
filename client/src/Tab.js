import TabsInfo from "./TabsInfo";
import TabsList from "./TabsList";

import React, {useState} from "react";

function Tab(){

    const [left, setLeft] = useState(false)

    function handleTransitionLeft(){
        setLeft(!left)
    }

    function handleClose(){
        setLeft(false)
    }

    return(
        <div className={left ? "container two-col" : null}>
            <TabsList handleTransitionLeft={handleTransitionLeft} left={left}/>
            <TabsInfo onClose={handleClose}/>
        </div>

    )
}

export default Tab