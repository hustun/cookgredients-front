import FilterItem from "./FilterItem/FilterItem";
import { IoIosClose } from "react-icons/io";
import styles from "./FilterSelectionPanel.module.scss"

function FilterSelectionPanel(props) {
    return (
        <div className={`w-full h-44 absolute top-28 lg:top-auto bottom-auto lg:bottom-full ${styles.primaryText500} ${styles.neutralBackground50} primary-border shadow rounded-xl font-lg p-4 mb-4`}>
            <div className={`mb-2 font-bold px-2 pb-2 flex justify-between items-center ${styles.primaryBorderBottom}`}><div>{props.currentlySelectedFilter}</div><IoIosClose className={`text-xl cursor-pointer rounded ${styles.hoverPrimaryBackground}`} onClick={() => {props.onClickIcon("")}}/></div>
            <div className={`w-full overflow-y-auto flex flex-wrap content-start mb-4 h-24 ${styles.scrollbarPrimary}`}>
                {console.log(props.filters)}
                {console.log(props.filters[props.currentlySelectedFilter])}

                {

                    props.filters[props.currentlySelectedFilter].map((el) => {
                        return (<FilterItem onClickFilterItem={props.onClickFilterItem} filterItem={el} filterName={props.currentlySelectedFilter} selectedFilters={props.selectedFilters} ></FilterItem>)
                    })
                }
            </div>
        </div>
    );
}

export default FilterSelectionPanel;