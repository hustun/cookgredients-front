import React, { useState, useEffect } from 'react';

import styles from "./SuggestionPanel.module.scss"

function SuggestionPanel(props) {

    function SuggestionElement(props) {
        const [isActive, setisActive] = useState(false);

        useEffect(() => {
            if (props.activeSuggestion == props.i) {
                setisActive(true)
            } else {
                setisActive(false)
            }
        }, []);
        return (<p className={"py-2 px-6 border-b-2 last:border-none cursor-pointer " + ((isActive) ? `${styles.primaryBackground75}` : "")} key={props.i}
            onMouseEnter={() => { props.onMouseEnterSuggestionElement(props.i) }}
            onClick={() => { props.addIngredient() }}
        >
            {props.el.name}</p>);
    }

    return (
        <div className={`border rounded-xl shadow overflow-auto py-2 absolute top-full mt-3 left-0 w-full ${styles.neutralBackground50}`}>
            {props.searchRecommendations.slice(0, 5).map((el, i) => {
                return (<SuggestionElement el={el} key={i} i={i} activeSuggestion={props.activeSuggestion} onMouseEnterSuggestionElement={props.onMouseEnterSuggestionElement} addIngredient={props.addIngredient}></SuggestionElement>)
            })}
        </div>
    );
}

export default SuggestionPanel;