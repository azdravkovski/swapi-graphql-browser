import React from "react";

//Converts key:value format to an array of strings for assigning to state variables
const extractStrings = input => {
    if (input) {
        return input.map(element => Object.values(element)).flat();
    }
};

//Populates the films, species and planets dropdowns with options 
const populateFilter = input => {
    if (input) {
        return input.map((element, index) => (
            <option key={index} value={element}>
                {element}
            </option>
        ));
    }
};



export { extractStrings, populateFilter }