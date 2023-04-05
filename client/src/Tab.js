import TabsInfo from "./TabsInfo";
import TabsList from "./TabsList";

function Tab({tabList, handleTransitionLeft, left, selectedTab, handleClose, 
    setCurrentUser}){

    return(
        <div className={left ? "container heigh-100 justify-content-center two-col" : null}>
            <TabsList handleTransitionLeft={handleTransitionLeft} left={left} tabList={tabList}/>
            <TabsInfo onClose={handleClose} left={left} selectedTab=
            {selectedTab}/>
        </div>

    )
}

export default Tab