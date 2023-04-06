import React from "react";

function MoneysInput({onChange, value, name, id}){
    const handleInputChange = (e) => {
        const regex = /^[0-9.,]*$/; // regex pattern to only allow numbers
        const inputValue = e.target.value;
        if (regex.test(inputValue)) {
          onChange(e);
        }
      };
    
      return (
        <div class="currency-wrap">
            <span class="currency-code">$</span>
            <input type="number" id={id} class="text-currency" name={name} 
            value={value} onChange={handleInputChange} />
        </div>
      );
}
export default MoneysInput