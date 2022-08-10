import React, { useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";

import styles from "./IngredientPanel.module.scss"

function IngredientItem(props) {
    return ( 
        <div className={`flex items-center p-3 rounded-xl shadow mr-2 cursor-pointer ${styles.neutralBackground50} ${styles.primaryText500} ${styles.hoverPrimaryBackground}`} 
            onClick={() => {props.onClickItem(props.el)}}
            >
            <div className='mr-2'>{props.el.name}</div>
            <IoIosClose className={`text-2xl cursor-pointer rounded`}/>
        </div>
     );
}

function IngredientPanel(props) {
    return ( 
    <div className={`w-full mt-3 rounded-xl p-2 flex overflow-x-auto pb-2 ${styles.scrollbarPrimary}`}>
        {props.searchItems.map((el, i) => {
            return (<IngredientItem el={el} key={i} onClickItem={props.deleteIngredient}></IngredientItem>)
        })}
    </div>
     );
}

export default IngredientPanel;