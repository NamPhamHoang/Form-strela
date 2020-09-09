import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Path from '../../../components/Path/Path';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import BackgroundSquare from '../../../components/BackgroundSquare/BackgroundSquare';
import Title from '../../../components/Titles/Title/Title';
import { gate } from '../../../api';
import Loading from '../../../components/Loading/Loading';
import { getImage } from '../../../helpers';
import { PrimaryButton } from '../../../components/Buttons/Button';
import PaginationItem from '../../../components/Pagination/PaginationItem';
import PaginationPrev from '../../../components/Pagination/PaginationPrev';
import PaginationEllipsis from '../../../components/Pagination/PaginationEllipsis';
import PaginationNext from '../../../components/Pagination/PaginationNext';

const ButtonsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    margin-bottom: 20px;
`;

const StyledUl = styled.ul`
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
`;

const Item = ({ slug, img, title, categoryName }) => {
    let url;
    switch (categoryName) {
        case 'aktualnosci':
            url = `/aktualnosci/${slug}`;
            break;
        case 'wydarzenia':
            url = `/wydarzenia/${slug}`;
            break;
        case 'baza-firm':
            url = `/baza-firm/firma/${slug}`;
            break;
        case 'pozostale':
            url = `/${slug}`;
            break;
        default:
            url = '/';
            break;
    }

    return (
        <div className="item" key={slug}>
            <div className="image-container">
                <img src={getImage(img)} alt="alt" className="img-fluid" />
            </div>
            <h6>{title}</h6>
            <Link to={url} className="btn btn-primary fw-300 fw-strong-500">
                <strong>Dowiedz się</strong> więcej
            </Link>
        </div>
    );
};

const Pagination = ({ categoryName, search, pages, currentPage }) => {
    const maxItems = 5;
    const showMore = 10;
    const maxPages = maxItems % 2 === 0 ? maxItems + 1 : maxItems;
    const centerOffset = Math.floor(maxPages / 2);

    const startOffsetExist = currentPage > centerOffset;
    const endOffsetExit = pages - currentPage >= centerOffset;

    let start;
    let end;

    if (pages < maxItems) {
        start = 1;
        end = pages;
    } else if (startOffsetExist && endOffsetExit) {
        start = currentPage - centerOffset;
        end = currentPage + centerOffset;
    } else if (startOffsetExist && !endOffsetExit) {
        start = pages - maxItems + 1;
        end = pages;
    } else if (!startOffsetExist && endOffsetExit) {
        start = 1;
        end = maxItems;
    }

    return (
        <StyledUl className="pagination">
            {currentPage > centerOffset + 1 && (
                <PaginationPrev path={`/wyniki-wyszukiwania/${categoryName}?q=${search}&page=${1}`} number={1} />
            )}

            {currentPage - centerOffset > showMore && (
                <>
                    <PaginationItem
                        path={`/wyniki-wyszukiwania/${categoryName}?q=${search}&page=${currentPage - showMore}`}
                        number={currentPage - showMore}
                    />
                    <PaginationEllipsis />
                </>
            )}

            {Array.from({ length: pages }, (v, k) => k + 1)
                .filter(item => {
                    return item >= start && item <= end;
                })
                .map(item => (
                    <>
                        <PaginationItem
                            number={item}
                            active={item === currentPage}
                            path={`/wyniki-wyszukiwania/${categoryName}?q=${search}&page=${item}`}
                        />
                    </>
                ))}

            {pages - (currentPage + centerOffset) > showMore && (
                <>
                    <PaginationEllipsis />
                    <PaginationItem
                        path={`/wyniki-wyszukiwania/${categoryName}?q=${search}&page=${currentPage + showMore}`}
                        number={currentPage + showMore}
                    />
                </>
            )}
            {pages - currentPage > centerOffset && (
                <PaginationNext path={`/wyniki-wyszukiwania/${categoryName}?q=${search}&page=${pages}`} />
            )}
        </StyledUl>
    );
};

export const Search = () => {
    const { categoryName } = useParams();
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState({
        events: 0,
        news: 0,
        others: 0,
        companies: 0,
    });

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        setSearch(state => parsed.q || state);
        setPage(state => parseInt(parsed.page, 10) || state);
    }, [location.search]);

    useEffect(() => {
        let urlParam;
        switch (categoryName) {
            case 'aktualnosci':
                urlParam = 'news';
                break;
            case 'wydarzenia':
                urlParam = 'events';
                break;
            case 'baza-firm':
                urlParam = 'companies';
                break;
            case 'pozostale':
                urlParam = 'others';
                break;
            default:
                urlParam = 'news';
                break;
        }

        if (search) {
            setLoading(true);
            axios
                .get(`${gate}/search/${urlParam}`, {
                    params: {
                        search,
                        page,
                    },
                })
                .then(({ data: { items: newItems, lastPage } }) => {
                    setPages(lastPage);
                    setItems(newItems);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                    setItems([]);
                    setPages(1);
                    setPage(1);
                });

            axios
                .get(`${gate}/search/count`, {
                    params: {
                        search,
                    },
                })
                .then(({ data }) => {
                    setCounts(data);
                })
                .catch(() => {});
        }
    }, [page, search, categoryName]);

    return (
        <>
            <Helmet>
                <title>Wyszukiwanie - Oficjalny Portal Gminy Jarocin</title>
                <meta name="description" content="Twoje wyniki wyszkiwania w serwisie jarocin.pl" />
            </Helmet>
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: window.location, label: 'Wyniki wyszukiwania' },
                ]}
            />
            <LayoutCard className="search">
                <BackgroundSquare />
                <Title>Sukana fraza: {search}</Title>
                <ButtonsWrapper>
                    <PrimaryButton
                        outline={categoryName !== 'aktualnosci'}
                        to={`/wyniki-wyszukiwania/aktualnosci?q=${search}&page=${page}`}
                    >
                        Aktualności ({parseInt(counts.news, 10)})
                    </PrimaryButton>
                    <PrimaryButton
                        outline={categoryName !== 'wydarzenia'}
                        to={`/wyniki-wyszukiwania/wydarzenia?q=${search}&page=${page}`}
                    >
                        Wydarzenia ({parseInt(counts.events, 10)})
                    </PrimaryButton>
                    <PrimaryButton
                        outline={categoryName !== 'baza-firm'}
                        to={`/wyniki-wyszukiwania/baza-firm?q=${search}&page=${page}`}
                    >
                        Baza firm ({parseInt(counts.companies, 10)})
                    </PrimaryButton>
                    <PrimaryButton
                        outline={categoryName !== 'pozostale'}
                        to={`/wyniki-wyszukiwania/pozostale?q=${search}&page=${page}`}
                    >
                        Pozostałe ({parseInt(counts.others, 10)})
                    </PrimaryButton>
                </ButtonsWrapper>
                {loading && <Loading />}

                {!loading && (
                    <>
                        <div className="items">
                            {items.map(item => (
                                <Item {...item} categoryName={categoryName} />
                            ))}
                        </div>

                        {pages > 1 && (
                            <Pagination categoryName={categoryName} currentPage={page} pages={pages} search={search} />
                        )}
                    </>
                )}
            </LayoutCard>
        </>
    );
};
