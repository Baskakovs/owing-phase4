//Importing dependencies
import uuid from "react-uuid"
function Categories({handleChange, form}){
    //EMOJIS
    const EMOJIS = {plane: "✈️", food: "🌮️", medicne: "💊", entertainment: "💃", 
    taxi: "🚕", drink: "🍺", energy: "⚡", cash: "💰"}
    return(
        <>
        {Object.keys(EMOJIS).map((emojiKey) =>{
            return(
            <label className="checkbox-with-emoji" key={emojiKey}>
                <input
                type="checkbox"
                name="category"
                value={emojiKey}
                onChange={handleChange}
                checked={form.category === 
                emojiKey}
                key={uuid()}
                />
                <span className="checkmark">
                    {EMOJIS[emojiKey]}
                </span>
            </label>
            )}
        )}
        </>
    )
}
export default Categories