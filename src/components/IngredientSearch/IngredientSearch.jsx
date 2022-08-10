import React, { useState, useEffect } from 'react';
import { BiSearch } from "react-icons/bi";
import { useTranslation } from 'react-i18next';
import SearchBar from './SearchBar/SearchBar';
import FilterPanel from './FilterPanel/FilterPanel';
import http from '../../common/http';
import SuggestionPanel from './SuggestionPanel/SuggestionPanel';
import { GiTomato } from "react-icons/gi";
import FullScreenLoader from '../Common/FullScreenLoader/FullScreenLoader';
import { isMobile } from 'react-device-detect';

import styles from "./IngredientSearch.module.scss"
import IngredientPanel from './IngredientPanel/IngredientPanel';



function IngredientSearch(props) {
    const [searchString, setSearchString] = useState("");
    const [searchRecommendations, setSearchRecommendations] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [ingredientList, setIngredientList] = useState([]);
    const [filters, setFilters] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({});
    const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
    const [isLoadingFilters, setIsLoadingFilters] = useState(true);
    const [activeSuggestion, setActiveSuggestion] = useState(0);


    const { t, i18n } = useTranslation();

    let foodTypes = [
        "Appetiser",
        "Main Course",
        "Dessert",
        "Beverage",
        "Salad",
        "Soup"
    ]

    let foodRegions = [
        "French",
        "Italian",
        "British",
        "American",
        "Chinese",
        "Japanese"
    ]

    const onMouseEnterSuggestionElement = (key) => {
        setActiveSuggestion(clamp(key, 0, Math.min(searchRecommendations.length - 1, 4)))
    }

    const onChangeSearchString = (e) => {
        //i18n.changeLanguage("tr")
        setActiveSuggestion(0)
        setSearchString(e.target.value)
        var result = ingredientList.filter(obj => {
            return obj.name.toLowerCase().startsWith(e.target.value.toLowerCase())
        })
        setSearchRecommendations(result)
    }

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    const addIngredient = () => {
        setSearchString("")
        let si = searchItems
        let siname = si.map((el) => {
            return el.name
        })

        if (!siname.includes(searchRecommendations[activeSuggestion].name)) {
            si.push(searchRecommendations[activeSuggestion])
            let ingredientListCopy = ingredientList
            ingredientListCopy = ingredientListCopy.filter((el) => {
                if (el.id != searchRecommendations[activeSuggestion].id) {
                    return el
                }
            })
            setIngredientList(ingredientListCopy)
            setSearchItems(si)
        }
        setSearchRecommendations([])
    }

    const onKeyDownSearchInput = (key) => {
        switch (key) {
            case "Enter":
                addIngredient();
                break;
            case "ArrowUp":
                setActiveSuggestion(clamp(activeSuggestion - 1, 0, Math.min(searchRecommendations.length - 1, 4)))
                break;
            case "ArrowDown":
                setActiveSuggestion(clamp(activeSuggestion + 1, 0, Math.min(searchRecommendations.length - 1, 4)))
                break;

            default:
                break;
        }
    }

    const getFilters = () => {
        http.get("/filters").then(res => {
            if (res.data.success) {
                setFilters(res.data.data);

                let selectedFiltersObj = {};
                Object.keys(res.data.data).forEach((el) => {
                    selectedFiltersObj[el] = [];
                })
                setSelectedFilters(selectedFiltersObj);
            } else {

            }
            setIsLoadingFilters(false)
        });
    }

    const getIngredients = () => {
        http.get("/ingredients").then(res => {
            if (res.data.success) {
                setIngredientList(res.data.data)
            } else {

            }
            setIsLoadingIngredients(false);
        });
    }

    const onClickFilterItem = (filterName, filterItem) => {
        console.log(filterName + filterItem)
        let selectedFiltersCopy = selectedFilters
        if (selectedFilters[filterName].includes(filterItem)) {
            selectedFiltersCopy[filterName] = selectedFiltersCopy[filterName].filter(item => item !== filterItem)
        } else {
            selectedFiltersCopy[filterName].push(filterItem)
        }
        setSelectedFilters(selectedFiltersCopy)
    }

    const deleteIngredient = (ingredient) => {
        let si = searchItems.filter((el) => {
            if (el.id != ingredient.id) {
                return el
            }
        })

        let il = ingredientList
        il.push(ingredient)
        setIngredientList(il)
        setSearchItems(si)
    }


    useEffect(() => {
        getIngredients();
        getFilters();
    }, []);

    return (
        <>
            {(isLoadingFilters || isLoadingIngredients) ? (<FullScreenLoader />) : (<div className='flex flex-col h-full w-full py-16'>
                <div className='w-full text-center flex'>
                    <div className='w-full'>
                        <h1 className='text-lg lg:text-4xl uppercase text-center font-bold'>{t('ingredientSearch.title')}{isMobile ? ' mobile' : ''}</h1>
                    </div>
                </div>
                <div className='w-full h-full flex justify-center'>
                    <div className={`w-full flex flex-col items-center order-1 lg:order-2 mt-4 lg:mt-0 px-4 max-w-4xl`}>
                        <div className='w-full h-full flex flex-col justify-center'>
                            <FilterPanel selectedFilters={selectedFilters} filters={filters} onClickFilterItem={onClickFilterItem}></FilterPanel>
                            <div className='relative'>
                                <SearchBar onChangeSearchString={onChangeSearchString} onKeyDownSearchInput={onKeyDownSearchInput} searchString={searchString} activeSuggestion={activeSuggestion} searchRecommendations={searchRecommendations}></SearchBar>
                                {(searchRecommendations.length > 0 && searchString) && <SuggestionPanel searchRecommendations={searchRecommendations} activeSuggestion={activeSuggestion} onMouseEnterSuggestionElement={onMouseEnterSuggestionElement} addIngredient={addIngredient}></SuggestionPanel>}

                            </div>
                            <IngredientPanel searchItems={searchItems} deleteIngredient={deleteIngredient}></IngredientPanel>
                        </div>
                    </div>
                </div>

            </div>)}
        </>

    );
}

export default IngredientSearch;