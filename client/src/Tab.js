import TabsInfo from "./TabsInfo";
import TabsList from "./TabsList";

import React, {useState, useEffect} from "react";

function Tab(){

    const [left, setLeft] = useState(false)
    const [tabList, setTabList] = useState([])
    const [selectedTab, setSelectedTab] = useState("")

    useEffect(() => {
        fetch("/tabs")
        .then( res =>{
            if(res.ok){
                res.json().then(data => setTabList(data))
            }
        })

    }, [])


    function handleTransitionLeft(id){
        setLeft(!left)
        tabList.filter((tab)=>{
            if(tab.id == id){
                setSelectedTab(tab)
            }
        })
    }

    function handleClose(){
        setLeft(false)
    }

    return(
        <div className={left ? "container heigh-100 justify-content-center two-col" : null}>
            <TabsList handleTransitionLeft={handleTransitionLeft} left={left} tabList={tabList}/>
            <TabsInfo onClose={handleClose} left={left} selectedTab=
            {selectedTab}/>
        </div>

    )
}

export default Tab