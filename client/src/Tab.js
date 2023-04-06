import TabsInfo from "./TabsInfo";
import TabsList from "./TabsList";
import { useHistory } from "react-router-dom";

function Tab({left}){
    
    return(
        <div className={left ? "container heigh-100 justify-content-center two-col" : null}>

            <TabsList left={left}/>
            <TabsInfo />
        </div>

    )
}

export default Tab