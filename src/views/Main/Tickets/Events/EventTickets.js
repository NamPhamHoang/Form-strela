import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_TICKETS_EVENTS } from '../../../../api';
import { getImage } from '../../../../helpers';
import SmallDate from '../../../../components/SmallDate/SmallDate';
import LayoutCardWithTitleAndPath from '../../../../templates/LayoutCardWithTitleAndPath';
import { NewPagination } from '../../../../components/Pagination/NewPagination';

const NewsCard = ({ photo, slug, name, party_at: partyAt, description }) => (
    <div className="news-list-item">
        <div className="img-container">
            <img src={getImage(photo)} alt={`Zdjęcie aktualności ${name}`} className="img-fluid" />
        </div>
        <div className="information">
            <h5>{name}</h5>
            <div className="date-and-category">
                <SmallDate date={partyAt} />
            </div>
            <p>{description}</p>
            <div className="button">
                <Link to={`/kup-bilet/wydarzenia/${slug}`} className="btn btn-primary">
                    Kup bilet
                </Link>
            </div>
        </div>
    </div>
);

export const EventTickets = ({ location: { search, pathname }, history }) => {
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(1);
    const [items, setItems] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            // setIsLoading(true);
            try {
                const response = await axios.get(API_TICKETS_EVENTS, {
                    params: {
                        page,
                    },
                });
                const {
                    events: { last_page: lastPage, data },
                } = response.data;
                setPages(lastPage);
                return data;
            } catch (e) {
                return [];
            }
        };

        if (page) {
            fetch().then(r => {
                setItems(r);
                // setIsLoading(false);
            });
        } else {
            const params = new URLSearchParams(search);
            const newPage = params.get('strona') || 1;
            setPage(parseInt(newPage, 10));
        }
    }, [page, search, pathname]);

    return (
        <>
            <LayoutCardWithTitleAndPath
                pathItems={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/kup-bilet', label: 'Kup bilet' },
                    { url: '/kup-bilet/wydarzenia', label: 'Wydarzenia' },
                ]}
                category="Wydarzenia"
                title="Wydarzenia - kup bilet"
                className="news-index"
            >
                <main>
                    {items.map(item => (
                        <NewsCard {...item} />
                    ))}
                    <NewPagination
                        current={page}
                        max={pages}
                        changePage={newPage => {
                            const params = new URLSearchParams(search);
                            params.set('strona', newPage);
                            history.push({
                                pathname,
                                search: params.toString(),
                            });
                            setPage(newPage);
                        }}
                    />
                </main>
            </LayoutCardWithTitleAndPath>
        </>
    );
};
/*
* title="Wydarzenia - kup bilet"
            description="Wydarzenia - kup bilet"
            keywords="Wydarzenia - kup bilet"
            redirect={null}
            loading={isLoading}
* */
