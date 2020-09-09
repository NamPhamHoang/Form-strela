import React from 'react';
import Pagination from './Pagination';
import PaginationItem from './PaginationItem';
import PaginationEllipsis from './PaginationEllipsis';
import PaginationPrev from './PaginationPrev';
import PaginationNext from './PaginationNext';

const BuildPagination = ({ current, max, buildQuery, name = 'strona', maxItems = 5, showMore = 10 }) => {
    const maxPages = maxItems % 2 === 0 ? maxItems + 1 : maxItems;
    const centerOffset = Math.floor(maxPages / 2);
    const items = [];

    const startOffsetExist = current > centerOffset;
    const endOffsetExit = max - current >= centerOffset;

    let start;
    let end;

    if (max < maxItems) {
        start = 1;
        end = max;
    } else if (startOffsetExist && endOffsetExit) {
        start = current - centerOffset;
        end = current + centerOffset;
    } else if (startOffsetExist && !endOffsetExit) {
        start = max - maxItems + 1;
        end = max;
    } else if (!startOffsetExist && endOffsetExit) {
        start = 1;
        end = maxItems;
    }

    for (let i = start; i <= end; i++) {
        items[i] = <PaginationItem path={buildQuery(name, i)} key={i} number={i} active={i === current}/>;
    }

    return (
        <Pagination>
            {current > centerOffset + 1 && (
                <PaginationPrev path={buildQuery(name, 1)}/>
            )}
            {current - centerOffset > showMore && <>
                <PaginationItem path={buildQuery(name, current - showMore)} number={current - showMore}/>
                <PaginationEllipsis/>
            </>}
            {items.map(item => item)}
            {max - (current + centerOffset) > showMore && <>
                <PaginationEllipsis/>
                <PaginationItem path={buildQuery(name, current + showMore)} number={current + showMore}/>
            </>}
            {max - current > centerOffset && (
                <PaginationNext path={buildQuery(name, max)}/>
            )}
        </Pagination>
    );
};

export default BuildPagination;