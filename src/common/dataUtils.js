import React from "react";

const extractStrings = input => {
    return input.map(element => Object.values(element)).flat();
};

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