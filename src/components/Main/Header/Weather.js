import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchWeatherAction } from '../../../actions';
import { checkIfDataExpired } from '../../../helpers';

const WeatherWrapper = styled.div`
    transition: opacity 0.3s, transform 0.3s;
    display: none;
    align-items: center;
    font-size: 1.5rem;
    color: #919191;
    @media screen and (min-width: 992px) {
        display: flex;
    }
`;

class Weather extends Component {
    componentDidMount() {
        // this.fetchAirQualityData();
        this.fetchWeather();
    }

    fetchWeather = () => {
        const { date } = this.props.weather;
        const { fetchWeather } = this.props;
        checkIfDataExpired(fetchWeather, date, 180);
    };

    render() {
        const { weather } = this.props.weather;
        return (
            <WeatherWrapper className="">
                {weather.temperature}&deg;C
                {weather.icon && <img src={weather.icon} alt="weather-icon" className="img-fluid" />}
            </WeatherWrapper>
        );
    }
}

const mapStateToProps = ({ weather }) => ({ weather });

export default connect(mapStateToProps, {
    fetchWeather: fetchWeatherAction,
})(Weather);
