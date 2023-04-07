import React from "react";

function DeptsInput({handleChange, value, name, id}){
      return (
        <div className="currency-wrap">
            <span className="currency-code">$</span>
            <input key={id} id={id} type="number" className="text-currency" 
            name={name} 
            value={value} 
            onChange={((e)=>handleChange(e))}/>
        </div>
      );
}
export default DeptsInput