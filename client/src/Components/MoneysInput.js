import React from "react";

function MoneysInput({handleChange, value, name, id}){
    const handleInputChange = (e) => {
        const regex = /^[0-9.,]*$/; // regex pattern to only allow numbers
        const inputValue = e.target.value;
        if (regex.test(inputValue)) {
          handleChange(e);
        }
      };
    
      return (
        <div className="currency-wrap">
            <span className="currency-code">$</span>
            <input type="number" id={id} className="text-currency" name={name} 
            value={value} onChange={handleInputChange} />
        </div>
      );
}
export default MoneysInput