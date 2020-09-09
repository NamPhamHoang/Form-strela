import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../../Loading/Loading';
import Item from './Item/Item';


class Calendar extends Component {
    state = {
        time: null,
    };


    componentDidMount() {
        const time = moment();
        moment.locale('pl');
        this.pushMonthUp(time);
        this.setState({ time });
    }

    pushMonthUp = (time) => {
        this.props.getDate(time.format('YYYY-MM-DD'));
    };

    subMonth = () => {
        this.setState(prevState => {
            let time = { ...prevState.time };
            time = moment(time).subtract(1, 'M');
            this.pushMonthUp(time);
            return { time };
        });
    };

    addMonth = () => {
        this.setState(prevState => {
            let time = { ...prevState.time };
            time = moment(time).add(1, 'M');
            this.pushMonthUp(time);
            return { time };
        });
    };

    generateCalendar = () => {
        const { time } = this.state;
        const { disposals, disposalsLoading } = this.props;
        if (disposalsLoading) return <Loading style={{ gridColumn: `1/8` }}/>;
        const items = [];
        const daysInMonth = time.daysInMonth();
        let startDay = moment(time).startOf('month').day();
        startDay = startDay === 0 ? 7 : startDay;


        for (let i = 1; i < daysInMonth + 1; i++) {
            const parameters = {
                day: i,
                key: i,
                style: {},
                items: disposals[i] || [],
            };
            if (i === 1) {
                parameters.style.gridColumn = `${startDay}/span 1`;
            }
            if ((startDay + i - 1) % 7 === 1) {
                parameters.style.borderLeftStyle = 'hidden';
            }
            if ((8 - startDay) < i) {
                parameters.style.borderTopStyle = 'solid';
            }
            const item = <Item {...parameters} />;
            items.push(item);
        }


        return items.map(item => item);
    };


    render() {
        const { time } = this.state;
        if (!time) return <Loading className="mt-6"/>;
        return (
            <div className="calendar">
                <header>
                    <Button onClick={this.subMonth}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </Button>
                    <h3>
                        {time.format('MMMM YYYY')}
                    </h3>
                    <Button onClick={this.addMonth}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </Button>
                </header>
                <main>
                    <div className="header first">Poniedziałek</div>
                    <div className="header">Wtorek</div>
                    <div className="header">Środa</div>
                    <div className="header">Czwartek</div>
                    <div className="header">Piątek</div>
                    <div className="header">Sobota</div>
                    <div className="header last">Niedziela</div>
                    {this.generateCalendar()}
                </main>
            </div>

        );
    }
}

export default Calendar;