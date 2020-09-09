import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/pro-light-svg-icons';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import Path from '../../components/Path/Path';
import LayoutCard from '../../components/Cards/LayoutCards/LayoutCard';
import SectionTitle from '../../components/Titles/SectionTitle/SectionTitle';
import Title from '../../components/Titles/Title/Title';
import ItemCard from '../../components/Views/CompanyIndex/ItemCard/ItemCard';
import CategoriesList from '../../components/Views/CompanyIndex/CategoriesList/CategoriesList';
import { API_COMPANIES_CATEGORIES, API_COMPANIES_INDEX } from '../../api';
import Loading from '../../components/Loading/Loading';

class CompanyIndex extends Component {
    state = {
        categories: [],
        companies: [],
        activeCategory: null,
        loadingCompanies: true,
        // loadingCard: true,
        redirect: null,
        nextPage: null,
    };

    loadMoreCategories = debounce(async () => {
        let request;
        try {
            request = await this.fetchCompanies(this.state.activeCategory);
        } catch (error) {
            this.setState({
                redirect: `/${error.response.status || 404}`,
            });
            return false;
        }

        this.setState(state => {
            const companies = [...state.companies];
            companies.push(...request.companies);
            return {
                companies,
                nextPage: request.nextPage,
            };
        });

        return true;
    }, 500);

    componentDidMount() {
        (async () => {
            const { categorySlug } = this.props.match.params;
            const parsedCategory = categorySlug || 'wszystkie';
            let categories;
            let companies;

            try {
                categories = await this.fetchCategories(parsedCategory);
                companies = await this.fetchCompanies(parsedCategory);
            } catch (error) {
                this.setState({
                    redirect: `/${error.response.status || 404}`,
                });
                return;
            }

            if (categories && companies) {
                this.setState({
                    ...categories,
                    ...companies,
                    // loadingCard: false,
                    loadingCompanies: false,
                    activeCategory: parsedCategory,
                });
            }
        })();
    }

    componentDidUpdate() {
        const { categorySlug } = this.props.match.params;
        const { activeCategory } = this.state;
        if (categorySlug !== activeCategory && !(categorySlug === undefined && activeCategory === 'wszystkie')) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(
                {
                    loadingCompanies: true,
                    activeCategory: categorySlug,
                    nextPage: null,
                },
                () => {
                    (async () => {
                        let companies;
                        try {
                            companies = await this.fetchCompanies(this.state.activeCategory || 'wszystkie');
                        } catch (error) {
                            this.setState({
                                redirect: `/${error.response.status || 404}`,
                            });
                            return;
                        }

                        this.setState({
                            ...companies,
                        });
                    })();
                },
            );
        }
    }

    fetchCategories = async () => {
        const response = await axios.get(API_COMPANIES_CATEGORIES);

        return {
            categories: response.data.data,
        };
    };

    fetchCompanies = async (category = null) => {
        const { activeCategory, nextPage } = this.state;
        const API = nextPage || API_COMPANIES_INDEX(category || activeCategory);
        const response = await axios.get(API);

        return {
            loadingCompanies: false,
            companies: response.data.data,
            nextPage: response.data.links.next,
        };
    };

    render() {
        const { companies, categories, redirect, loadingCompanies, activeCategory, nextPage } = this.state;
        const pathItems = [
            { url: '/', label: 'Strona główna' },
            { url: '/baza-firm', label: 'Baza firm' },
        ];
        if (activeCategory && categories && activeCategory !== 'wszystkie') {
            const category = categories.find(item => item.slug === activeCategory);
            pathItems.push({
                url: `/baza-firm/${activeCategory}`,
                label: category.name,
            });
        }

        const { role } = this.props;

        return (
            <>
                {redirect && <Redirect to={redirect} />}
                <Path items={pathItems} />
                <LayoutCard className="company-index">
                    <Row>
                        <Col className="description">
                            <SectionTitle>Dla mieszkańców</SectionTitle>
                            <Title>Baza firm</Title>
                        </Col>
                        <Col md="auto" className="add-button">
                            <div>
                                {role !== 2 && (
                                    <>
                                        <button
                                            className="btn btn-primary btn-sm add-button"
                                            type="button"
                                            onClick={() => {
                                                NotificationManager.error(
                                                    'Zarejestruj się jako firma, aby dodać firmę do bazy firm',
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faBuilding} /> Dodaj swoją firmę
                                        </button>
                                    </>
                                )}
                                {role === 2 && (
                                    <Link to="/panel/firma/firmy" className="btn btn-primary btn-sm add-button">
                                        <FontAwesomeIcon icon={faBuilding} /> Dodaj swoją firmę
                                    </Link>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={{ span: 12, order: 2 }} xl={{ span: 8, order: 1 }}>
                            {loadingCompanies && <Loading className="mt-5" />}
                            {!loadingCompanies && (
                                <>
                                    <InfiniteScroll
                                        loadMore={this.loadMoreCategories}
                                        hasMore={nextPage !== null}
                                        loader={<Loading key={0} />}
                                    >
                                        {companies.map(company => (
                                            <ItemCard key={company.slug} {...company} />
                                        ))}
                                    </InfiniteScroll>
                                </>
                            )}
                        </Col>
                        <Col xs={{ span: 12, order: 1 }} lg={{ span: 8, order: 1 }} xl={{ span: 4, order: 2 }}>
                            <CategoriesList categories={categories} activeCategory={activeCategory} />
                        </Col>
                    </Row>
                </LayoutCard>
            </>
        );
    }
}

const mapStateToProps = ({ role }) => ({ role });

export default connect(mapStateToProps, {})(withRouter(CompanyIndex));

/*
 * loading={loadingCard} redirect={redirect} title="todo" description="todo" keywords="todo"
 * */
