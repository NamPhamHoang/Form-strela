import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Path from '../../../components/Path/Path';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../../components/Titles/Title/Title';
import { gate } from '../../../api';
import { AccordionList } from '../../../components/Collapse/AccordionList';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 20px;
    & > div {
        grid-row: 1/3;
    }

    @media screen and (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

const StyledList = styled.ul`
    background-color: #f2f2f2;
    border-radius: 10px;
    padding: 30px 20px;
    list-style: none;
    position: sticky;
    top: 100px;
    & > li {
        margin: 0 auto 30px;
    }
    ul {
        list-style: none;
        li {
            padding-left: 5px;
        }
    }
`;

const StyledLink = styled(Link)`
    ${({ active }) =>
        !active &&
        css`
            color: #000000;
        `};
`;

export const EOfficePost = ({
    match: {
        params: { slug, postSlug },
    },
}) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [collapses, setCollapses] = useState([]);
    const [categoryName, setCategoryName] = useState(null);
    const [subcategoryName, setSubcategoryName] = useState(null);
    useEffect(() => {
        axios.get(`${gate}/e-office/categories/${slug}/${postSlug}`).then(({ data }) => {
            setPosts(data.posts);
            setCategoryName(data.category.name);
            setSubcategoryName(data.subcategory.name);
            if (data.posts.length) {
                setContent(data.posts[0].content);
                setTitle(data.posts[0].name);
                setCollapses(data.posts[0].collapses);
            }
        });
    }, [slug, postSlug]);
    return (
        <>
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/e-urzad', label: 'eUrząd' },
                    { url: `/e-urzad/${slug}`, label: categoryName },
                    { url: `/e-urzad/${slug}/${postSlug}`, label: subcategoryName },
                ]}
            />
            <LayoutCard>
                <Title className="color-blue">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <Link to="/e-urzad">eUrząd</Link> > <Link to={`/e-urzad/${slug}`}>{categoryName}</Link> >{' '}
                    {subcategoryName}
                </Title>
                <Grid>
                    <div>
                        <h5 className="color-blue">{title}</h5>
                        {/* eslint-disable-next-line react/no-danger */}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                        />
                        <div>
                            <AccordionList elements={collapses} />
                        </div>
                    </div>
                    <StyledList>
                        {posts.map(item => {
                            return (
                                <li>
                                    <StyledLink
                                        to="#"
                                        onClick={() => {
                                            if (item.isContent) {
                                                setTitle(item.name);
                                                setContent(item.content);
                                                setCollapses(item.collapses);
                                            }
                                        }}
                                        active={title === item.name}
                                    >
                                        {item.name}
                                    </StyledLink>
                                    {!!item.subPosts.length && (
                                        <ul>
                                            {item.subPosts.map(subPost => (
                                                <li>
                                                    <StyledLink
                                                        to="#"
                                                        active={title === subPost.name}
                                                        onClick={() => {
                                                            setTitle(subPost.name);
                                                            setContent(subPost.content);
                                                            setCollapses(subPost.collapses);
                                                        }}
                                                    >
                                                        {subPost.name}
                                                    </StyledLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </StyledList>
                </Grid>
            </LayoutCard>
        </>
    );
};
