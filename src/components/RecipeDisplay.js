import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function RecipeDisplay(props) {
    let { recipeId } = useParams();

    useEffect(() => {
        console.log("test")
    }, []);

    return (
        <h1>Recipe Display {recipeId}</h1>
    );
}

export default RecipeDisplay;