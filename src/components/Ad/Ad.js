import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import { checkIfDataExpired } from '../../helpers';
import LoadingGrayCard from '../Loading/LoadingGrayCard/LoadingGrayCard';
import { fetchAdsAction } from '../../actions';

class Ad extends Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const { date } = this.props.ads;
        const { fetchAds } = this.props;
        checkIfDataExpired(() => fetchAds(this.props.type), date, 60);
    };

    render() {
        const ads = this.props.ads.ads[this.props.type];
        if (this.props.ads.loading || !ads) {
            return <LoadingGrayCard />;
        }

        if (ads.length === 0) {
            return <></>;
        }

        return (
            <div className={`ad ad-${this.props.height}`}>
                <Carousel indicators={false} fade>
                    {ads.map(item => {
                        const { id, fileUrl, url, fileSmallUrl } = item;
                        return (
                            <Carousel.Item key={id}>
                                <a
                                    href={url}
                                    onClick={() => {
                                        ReactGA.event({
                                            category: 'Uzytkownik',
                                            action: `Kliknięcie w baner reklamowy nr ${id} - ${url}`,
                                        });
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="photo-container">
                                        <picture>
                                            <source media="(min-width: 992px)" srcSet={fileUrl} />
                                            <img src={fileSmallUrl || fileUrl} alt={`Reklama numer ${id}`} />
                                        </picture>
                                    </div>
                                </a>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div>
        );
    }
}

Ad.propTypes = {
    type: PropTypes.number.isRequired,
};

const mapStateToProps = ({ ads }) => ({ ads });

export default connect(mapStateToProps, {
    fetchAds: fetchAdsAction,
})(Ad);
