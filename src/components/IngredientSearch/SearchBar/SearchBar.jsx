import React, { useState, useEffect } from 'react';
import { ImSearch } from "react-icons/im";
import { useTranslation } from 'react-i18next';

import styles from "./SearchBar.module.scss"

function SearchBar(props) {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        console.log(props)
    }, []);

    return (
        <div className={`flex rounded-full w-full shadow-lg ${styles.neutralGradient} justify-self-center`}>
            <div className='w-full relative'>
                <div className='absolute px-6 py-2 text-xl z-10'>{props.searchString}<span className={`${styles.primaryText400}`}>{(props.searchRecommendations.length > 0 && props.searchString) ? (props.searchRecommendations[props.activeSuggestion].name.substring(props.searchString.length)) : ''}</span></div>
                <input
                    onChange={(e) => props.onChangeSearchString(e)}
                    onKeyDown={e => {
                        if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
                            e.preventDefault()
                            props.onKeyDownSearchInput(e.key)
                        }
                    }}
                    value={props.searchString} className="mx-auto px-6 py-2 text-xl w-full bg-transparent z-20 relative" autoComplete="off" type="text" id="fname" name="fname" placeholder={t('ingredientSearch.searchPlaceholder')} />

            </div>
            <div className={`${styles.primaryGradient} rounded-r-full flex justify-center items-center`}><ImSearch className={`mx-4 ${styles.neutralText50}`}></ImSearch></div>
        </div >
    );
}

export default SearchBar;


