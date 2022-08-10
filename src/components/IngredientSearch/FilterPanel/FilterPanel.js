import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCheckbox, IoSquare } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { RiLeafFill } from "react-icons/ri";
import { GiPieSlice, GiBowlOfRice } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import FilterIcon from './FilterIcon/FilterIcon';
import FilterSelectionPanel from './FilterSelectionPanel/FilterSelectionPanel';

import styles from "./FilterPanel.module.scss"

function FilterPanel(props) {
    const { t, i18n } = useTranslation();
    const [isFilterHovered, setIsFilterHovered] = useState({});
    const [currentlySelectedFilter, setCurrentlySelectedFilter] = useState("");

    let filterIconsLUT = {
        "Region": <GiBowlOfRice />,
        "Diet": <RiLeafFill />,
        "Type": <GiPieSlice />,
        "Content": <FaHeartbeat />,
    }

    useEffect(() => {
        setIsFilterHovered({
            "Regions": false,
            "Diet": false,
            "Type": false,
            "Content": false,
        })
    }, []);

    const onClickIcon = (filterName) => {
        if (currentlySelectedFilter == filterName) {
            setCurrentlySelectedFilter("");
        } else {
            setCurrentlySelectedFilter(filterName);
        }
    }

    return (
        <div className='flex mb-4 relative'>
            {currentlySelectedFilter && <FilterSelectionPanel onClickFilterItem={props.onClickFilterItem} selectedFilters={props.selectedFilters} filters={props.filters} currentlySelectedFilter={currentlySelectedFilter} onClickIcon={onClickIcon}></FilterSelectionPanel>}
            {Object.keys(props.filters).map((k) => {
                return (<FilterIcon icon={filterIconsLUT[k]} filterName={k} currentlySelectedFilter={currentlySelectedFilter} onClickIcon={onClickIcon} />)
            })}
        </div >
    );
}

export default FilterPanel;

