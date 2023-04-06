//Importing dependencies
import { useHistory } from "react-router-dom";
//Importing components
import TabsInfo from "./TabsInfo";
import TabsList from "./TabsList";

function Tab({left}){
    
    return(
        <div className={left ? "container heigh-100 justify-content-center two-col" : null}>
            <TabsList left={left}/>
            <TabsInfo />
        </div>

    )
}

export default Tab