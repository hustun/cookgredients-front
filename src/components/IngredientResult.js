import React, { useState, useEffect } from 'react';

function IngredientResult(props) {

    useEffect(() => {
        console.log("test")
    }, []);

    return (
        <h1>Ingredient Result</h1>
    );
}

export default IngredientResult;