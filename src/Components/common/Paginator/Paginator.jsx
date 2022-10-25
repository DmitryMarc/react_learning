import React, { useState } from 'react';
import styles from './Paginator.module.css';

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize); // Количество страниц / размер порции = количество порций страниц
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; // Минимальная граница порции 
    //(порядковый номер первого элемента порции) = (номер текущей страницы - 1) * размер порции(кол-во элементов порции) + 1
    let rightPortionPageNumber = portionNumber * portionSize; //номер текущей страницы * размер порции 

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>

            }
            {pages.filter(page => page >= leftPortionPageNumber
                && page <= rightPortionPageNumber).map(page => {
                    return <span className= {`${currentPage === page
                        && styles.selectedPage} ${styles.pageNumber}`} onClick={() => { onPageChanged(page) }}>{page}</span>;
                })}
            {portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>
            }
        </div>
    )
}

export default Paginator;

