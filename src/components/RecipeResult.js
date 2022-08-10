import React, { useState, useEffect } from 'react';

function RecipeResult(props) {

    useEffect(() => {
        console.log("test")
    }, []);

    return (
        <h1>Recipe Result</h1>
    );
}

export default RecipeResult;