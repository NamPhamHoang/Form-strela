import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Path from '../../../components/Path/Path';
import LayoutCard from '../../../components/Cards/LayoutCards/LayoutCard';
import Title from '../../../components/Titles/Title/Title';
import { gate } from '../../../api';
import { AccordionList } from '../../../components/Collapse/AccordionList';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    grid-gap: 20px;
    margin-top: 20px;
    @media screen and (max-width: 991px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 575px) {
        grid-template-columns: 1fr;
    }
`;

const Item = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: ${({ theme: { blue } }) => blue};
    border: 2px solid ${({ theme: { blue } }) => blue};
    border-radius: 10px;
    padding: 20px 10px;
    text-transform: uppercase;
    color: #ffffff;
    transition: color 0.3s, background-color 0.3s, border 0.3s;
    min-height: 110px;
    &:hover {
        color: ${({ theme: { blue } }) => blue};
        background-color: #ffffff;
        text-decoration: none;
    }

    :nth-child(even) {
        background-color: ${({ theme: { lightgray } }) => lightgray};
        border-color: ${({ theme: { lightgray } }) => lightgray};
        color: #000000;
        &:hover {
            color: #ffffff;
            background-color: ${({ theme: { blue } }) => blue};
            border-color: ${({ theme: { blue } }) => blue};
            text-decoration: none;
        }
    }

    //&:odd
`;

/* const A = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #f2f2f2;
    border-radius: 10px;
    padding: 20px 10px;
    text-transform: uppercase;
    transition: transform 0.3s ease-in-out;
    &:hover {
        text-decoration: none;
        transform: scale(0.9);
    }
`; */

const PostsGrid = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: auto auto auto;
    grid-gap: 20px;
    & > div {
        grid-row: 1/4;
    }

    @media screen and (max-width: 767px) {
        & > div {
            grid-row: 1;
        }
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
    grid-column: 2;
    grid-row: 2;
    @media screen and (max-width: 767px) {
        grid-column: 1;
        grid-row: 3;
    }
`;

const StyledListLi = styled.li`
    ::before {
        content: '•';
        color: #000000;
        font-size: 20px;
        margin-right: 5px;
        ${({ active }) =>
            active &&
            css`
                color: ${({ theme: { blue } }) => blue};
            `}
    }
`;

const StyledLink = styled(Link)`
    ${({ active }) =>
        !active &&
        css`
            color: #000000;
        `};
`;

const Content = styled.div`
    grid-column: 2;
    grid-row: 1 !important;
    @media screen and (max-width: 767px) {
        grid-column: 1;
        grid-row: 2 !important;
    }
`;

export const EOfficeCategory = ({
    match: {
        params: { slug },
    },
}) => {
    const [name, setName] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [category, setCategory] = useState({});
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState('');
    const [subContent, setSubContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [collapses, setCollapses] = useState([]);

    useEffect(() => {
        axios.get(`${gate}/e-office/categories/${slug}`).then(({ data: { category: newCategory } }) => {
            setName(newCategory.name);
            setSubcategories(newCategory.categories);
            setPosts(newCategory.posts);
            setCategory(newCategory);
            if (newCategory.posts.length) {
                setContent(newCategory.posts[0].content);
                setSubContent(newCategory.posts[0].subContent);
                setTitle(newCategory.posts[0].name);
                setCollapses(newCategory.posts[0].collapses);
            }
        });
    }, [slug]);

    const getParent = ({ parent }) => {
        if (parent) {
            const p = {
                url: `/e-urzad/${parent.slug}`,
                label: parent.name,
            };
            const p1 = getParent(parent);

            return [p, ...p1];
        }
        return [];
    };

    return (
        <>
            <Path
                items={[
                    { url: '/', label: 'Strona główna' },
                    { url: '/e-urzad', label: 'eUrząd' },
                    ...getParent(category)
                        .reverse()
                        .map(cat => {
                            return cat;
                        }),
                    { url: `/e-urzad/${slug}`, label: name },
                ]}
            />
            <LayoutCard>
                <Title className="color-blue">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <Link to="/e-urzad">eUrząd</Link> >{' '}
                    {getParent(category)
                        .reverse()
                        .map(cat => {
                            return (
                                <>
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <Link to={cat.url}>{cat.label}</Link> >{' '}
                                </>
                            );
                        })}{' '}
                    {name}
                </Title>
                {!!subcategories.length && (
                    <Grid>
                        {subcategories.map(({ slug: subcategorySlug, name: subcategoryName }) => {
                            return (
                                <Item to={`/e-urzad/${subcategorySlug}`}>
                                    <span>{subcategoryName}</span>
                                </Item>
                            );
                        })}
                    </Grid>
                )}

                {!subcategories.length && !!posts.length && (
                    <PostsGrid>
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
                        <Content
                            dangerouslySetInnerHTML={{
                                __html: subContent,
                            }}
                        />
                        <StyledList>
                            {posts.map(item => {
                                return (
                                    <StyledListLi active={title === item.name}>
                                        <StyledLink
                                            to="#"
                                            onClick={() => {
                                                if (item.isContent) {
                                                    setTitle(item.name);
                                                    setContent(item.content);
                                                    setCollapses(item.collapses);
                                                    setSubContent(item.subContent);
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
                                                                setSubContent(subPost.subContent);
                                                            }}
                                                        >
                                                            {subPost.name}
                                                        </StyledLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </StyledListLi>
                                );
                            })}
                        </StyledList>
                    </PostsGrid>
                )}
            </LayoutCard>
        </>
    );
};
