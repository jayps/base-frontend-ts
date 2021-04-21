import {Pagination} from "react-bootstrap";
import React from "react";
import {current} from "@reduxjs/toolkit";

export interface DataTablePaginationProps {
    numberOfPages: number,
    currentPage: number,
    onClick: Function
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({numberOfPages, currentPage, onClick}) => {
    const showAllPages = numberOfPages <= 7;
    const pagesToDisplay = 5;
    const pageItems = [];

    if (showAllPages) {
        for (let i = 1; i <= numberOfPages; i++) {
            pageItems.push(<Pagination.Item key={i} onClick={() => onClick(i)} active={currentPage === i}>{i}</Pagination.Item>);
        }
    } else {
        pageItems.push(<Pagination.First onClick={() => onClick(1)} disabled={currentPage === 1} />)
        pageItems.push(<Pagination.Prev onClick={() => onClick(currentPage - 1)} disabled={currentPage === 1}/>)

        let pages = [];
        if (currentPage <= pagesToDisplay) {
            pages = [1, 2, 3, 4, 5];
        } else if (currentPage > numberOfPages - pagesToDisplay) {
            pages = [numberOfPages - 4, numberOfPages - 3, numberOfPages - 2, numberOfPages - 1, numberOfPages];
        } else {
            pages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
        }

        pages.forEach((page: number) => {
            pageItems.push(<Pagination.Item key={page} onClick={() => onClick(page)} active={currentPage === page}>{page}</Pagination.Item>)
        });

        pageItems.push(<Pagination.Next onClick={() => onClick(currentPage + 1)} disabled={currentPage >= numberOfPages} />);
        pageItems.push(<Pagination.Last onClick={() => onClick(numberOfPages)}  disabled={currentPage >= numberOfPages} />);
    }

    return (
        <Pagination className="justify-content-center">
            {pageItems.map(p => p)}
        </Pagination>
    )
}

export default DataTablePagination;