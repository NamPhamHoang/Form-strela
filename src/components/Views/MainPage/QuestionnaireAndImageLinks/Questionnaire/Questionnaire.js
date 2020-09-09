import React, { Component } from 'react';
import SectionTitle from '../../../../Titles/SectionTitle/SectionTitle';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/pro-regular-svg-icons';
import { connect } from 'react-redux';
import { fetchQuestionnaireAction, voteQuestionnaireAction } from '../../../../../actions';
import LoadingGrayCard from '../../../../Loading/LoadingGrayCard/LoadingGrayCard';
import { withCookies } from 'react-cookie';
import { checkIfDataExpired } from '../../../../../helpers';
import { API_QUESTIONNAIRE_VOTE } from '../../../../../api';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

class Questionnaire extends Component {
    state = {
        optionId: 1,
        forceVote: false,
    };

    componentDidMount() {
        this.fetchQuestionnaireData();
    }

    fetchQuestionnaireData = () => {
        const { date } = this.props.questionnaire;
        const { fetchQuestionnaire } = this.props;
        const hash = this.props.cookies.get('questionnaire_identifier') || 'no_cookie';
        checkIfDataExpired(() => fetchQuestionnaire(hash), date, 180);
    };

    changeVote = (id) => this.setState({ optionId: id });

    submitVote = (e) => {
        e.preventDefault();
        const { voteQuestionnaire } = this.props;
        const { questionnaire } = this.props.questionnaire;
        const { optionId } = this.state;
        const hash = this.props.cookies.get('questionnaire_identifier') || 'no_cookie';
        const API = API_QUESTIONNAIRE_VOTE(questionnaire.id);
        const fd = {
            questionnaire_cookie_identifier: hash,
            option_id: optionId,
        };
        axios.post(API, fd)
            .then(response => {
                this.props.cookies.set('questionnaire_identifier', response.data.cookie_identifier, { path: '/' });
                voteQuestionnaire();
                this.setState({
                    forceVote: true,
                });
            })
            .catch(error => {
                NotificationManager.error('Nie udało się zagłosować');
            });
    };

    render() {
        const { questionnaire, loading, canVote } = this.props.questionnaire;
        const { optionId, forceVote } = this.state;
        return (
            <div className="questionnaire">
                {loading && <LoadingGrayCard/>}
                {!loading && <>
                    <SectionTitle>Sonda</SectionTitle>
                    <h6>{questionnaire.question}</h6>
                    <Form onSubmit={this.submitVote}>
                        <div className="questions custom-scrollbar">
                            {questionnaire.options.map(item => (
                                <Form.Check
                                    key={item.id}
                                    custom
                                    type="radio"
                                    name="answer"
                                    id={`answer-${item.id}`}
                                    label={item.answer}
                                    onChange={() => this.changeVote(item.id)}
                                    checked={optionId === item.id}
                                />
                            ))}
                        </div>
                        {(canVote || (canVote && forceVote)) && (
                            <div className="button">
                                <div>
                                    <Button type="submit" variant="orange" size={'sm'}>Zagłosuj <FontAwesomeIcon
                                        icon={faCheckDouble}/></Button>
                                </div>
                            </div>
                        )}

                    </Form>
                </>}
                {(!loading && (!canVote || forceVote)) && (
                    <div className="voted-overlay">
                        <p>Dziękujemy za oddanie głosu</p>
                    </div>
                )}

            </div>
        );
    }
}

const mapStateToProps = ({ questionnaire }) => ({ questionnaire });

export default withCookies(connect(mapStateToProps, {
    fetchQuestionnaire: fetchQuestionnaireAction,
    voteQuestionnaire: voteQuestionnaireAction,
})(Questionnaire));