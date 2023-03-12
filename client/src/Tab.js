import TabsInfo from "./TabsInfo";
import TabsList from "./TabsList";

import React, {useState, useEffect} from "react";

function Tab(){

    const [left, setLeft] = useState(false)
    const [tabList, setTabList] = useState([])

    useEffect(() => {
        fetch("/tabs")
        .then( res =>{
            if(res.ok){
                res.json().then(data => setTabList(data))
            }
        })

    }, [])

    function handleTransitionLeft(){
        setLeft(!left)
    }

    function handleClose(){
        setLeft(false)
    }

    return(
        <div className={left ? "container heigh-100 justify-content-center two-col" : null}>
            <TabsList handleTransitionLeft={handleTransitionLeft} left={left} tabList={tabList}/>
            <TabsInfo onClose={handleClose} left={left}/>
        </div>

    )
}

export default Tab