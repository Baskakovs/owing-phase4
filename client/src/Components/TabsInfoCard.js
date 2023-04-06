//Importing dependencies
import React, {useState} from "react"
import { useHistory } from "react-router-dom"

function TabsInfoCard({selectedTab}){

    const history = useHistory()

    const {id, category, description, created_at, user} = selectedTab
    const {name} = user

    //FORMATING DATA AND TIME
    //=======================
    const date = new Date(created_at);
    // format time
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //Format date
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${day}/${month}/${year}`;

    //SETTING EMOJI FOR CATEGORY
    //==========================
    const emojis = {plane: "✈️", food: "🌮️", medicine: "💊", entertainment: "💃", taxi: "🚕", drinks: "🍺", energy: "⚡️", cash: "💵"}

    const [emojiCategory, setEmojiCategory] = useState(emojis[category])

    //HANDLING CLICK
    //==============
    function handleClick(){
        history.push(`/payment/${id}`)
    }

    return(
        <div className="container three-col tab-info-card align-content-center" onClick={handleClick}>
            <div><h3 className="text-start">{name}</h3></div>
            <div><h3 className="text-center"><span>{emojiCategory}</span>  {description}</h3></div>
            <div className="justify-content-end"><h3 className="text-center">{formattedDate}</h3><h3 className="text-center">{time}</h3></div>
        </div>
    )

}

export default TabsInfoCard;