import { useState, useRef, useEffect, useCallback } from "react";
import { HiFilter } from "react-icons/hi";
import {isMobile} from 'react-device-detect';

import styles from "./FilterIcon.module.scss"

function FilterIcon(props) {
    const [isFilterHovered, setIsFilterHovered] = useState(false);
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


    const onMouseEnterIcon = () => {
        console.log()
        setIsFilterHovered(!isFilterHovered);
    }

    const isCurrentlySelected = () => {
        return props.currentlySelectedFilter == props.filterName
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                // if (ref.current && !ref.current.contains(event.target)) 
                forceUpdate();
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        < div ref={wrapperRef} className={`p-1 mr-2 ${styles.neutralBackground50} shadow rounded-xl cursor-pointer select-none font-lg  flex items-center transition-all ` + (isCurrentlySelected() ? `${styles.primaryBackground500} ${styles.neutralText75}` : `${styles.primaryText500}`)}
            onMouseEnter={(e) => onMouseEnterIcon()}
            onMouseLeave={() => onMouseEnterIcon()}
            onClick={() => props.onClickIcon(props.filterName)}
        >
            <div className="p-2">
                {props.icon ? props.icon : <HiFilter />}
            </div>
            < div className={'transition-all ' + (((!isMobile && isFilterHovered) || isCurrentlySelected()) ? "w-16 mr-2" : " w-0 overflow-hidden")}>
                {props.filterName}
            </div>
        </div >
    );
}

export default FilterIcon;