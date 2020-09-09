import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/pro-light-svg-icons';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const PaginationPrev = ({ changePage }) => {
    return (
        <PaginationItem changePage={changePage} linkClass="prev">
            <span aria-hidden="true">
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </span>
            <span className="sr-only">Previous</span>
        </PaginationItem>
    );
};

const PaginationEllipsis = () => {
    const className = `page-item ellipsis`;
    return (
        <li className={className}>
            <span className="page-link">...</span>
        </li>
    );
};

const PaginationNext = ({ changePage }) => {
    return (
        <PaginationItem changePage={changePage} linkClass="next">
            <span aria-hidden="true">
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </span>
            <span className="sr-only">Next</span>
        </PaginationItem>
    );
};

const PaginationItem = ({ changePage, children, active, linkClass }) => {
    const className = `page-item ${active ? 'active' : ''} ${linkClass}`;
    return (
        <li className={className}>
            <button onClick={changePage} type="button" className="page-link">
                {children}
            </button>
        </li>
    );
};

export const NewPagination = ({ current, max, changePage }) => {
    const maxItems = 5;
    const showMore = 10;
    const maxPages = maxItems % 2 === 0 ? maxItems + 1 : maxItems;
    const centerOffset = Math.floor(maxPages / 2);

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

    return (
        <StyledDiv>
            <ul className="pagination">
                {current > centerOffset + 1 && (
                    <PaginationPrev
                        changePage={() => {
                            changePage(current - 1);
                        }}
                    />
                )}

                {current - centerOffset > showMore && (
                    <>
                        <PaginationItem
                            changePage={() => {
                                changePage(current - 1);
                            }}
                        >
                            {current - showMore}
                        </PaginationItem>

                        <PaginationEllipsis />
                    </>
                )}

                {Array.from({ length: end - start + 1 }).map((value, index) => (
                    <PaginationItem
                        active={index + start === current}
                        changePage={() => {
                            changePage(index + start);
                        }}
                    >
                        {index + start}
                    </PaginationItem>
                ))}

                {max - (current + centerOffset) > showMore && (
                    <>
                        <PaginationEllipsis />
                        <PaginationItem>{current + showMore}</PaginationItem>
                    </>
                )}

                {max - current > centerOffset && (
                    <PaginationNext
                        changePage={() => {
                            changePage(current + 1);
                        }}
                    />
                )}
            </ul>
        </StyledDiv>
    );
};
