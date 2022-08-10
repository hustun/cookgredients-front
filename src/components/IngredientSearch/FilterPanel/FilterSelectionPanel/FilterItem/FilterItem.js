import React, { useState, useEffect, useCallback } from 'react';
import styles from "./FilterItem.module.scss"
import { AiOutlineCheck } from "react-icons/ai";

function FilterItem(props) {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const isSelected = () => {
        return props.selectedFilters[props.filterName].includes(props.filterItem)
    }

    return (
        <div
            className="w-1/2 cursor-pointer select-none mb-2"

        >
            <div className={`w-fit px-2 rounded flex items-center ${styles.hoverPrimaryBackground}`}
                onClick={() => { props.onClickFilterItem(props.filterName, props.filterItem); forceUpdate() }}
            >{props.filterItem}
                {isSelected() && <AiOutlineCheck className='ml-1' />}</div>
        </div >
    );
}

export default FilterItem;