import styles from "../../Users/Users.module.css";
import React, {useState} from "react";

const Paginator = ({totalItemsCount, pageSize, currentPage, onCurrentPageClick, portionSize = 10}) => {

    let pageCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++)
        pages.push(i);
    debugger

    let portionCount = Math.ceil(pageCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rigthPortionNumber = portionNumber * portionSize;


    return (
        <div className={styles.pagination}>
            {
                portionNumber > 1 ?
                    <button onClick={() => setPortionNumber(portionNumber - 1)}>PREVIOUS</button>
                    :
                    <button className={styles.pagination__empty}>PREVIOUS</button>
                    // <div className={styles.pagination__empty}></div>
            }
            <div>
                {pages
                    .filter(p => p >= leftPortionNumber && p <= rigthPortionNumber)
                    .map(p =>
                        <a onClick={() => {
                            onCurrentPageClick(p)
                        }}
                           key={p}
                           className={currentPage === p && styles.selected__page}>
                            {p}
                        </a>
                    )}
            </div>
            {
                portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
            }
        </div>
    )
}

export default Paginator;