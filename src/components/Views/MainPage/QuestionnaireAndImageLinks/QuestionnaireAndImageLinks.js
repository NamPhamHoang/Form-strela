import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ImageLink from '../../../ImageLink/ImageLink';
import Col from 'react-bootstrap/Col';
import Questionnaire from './Questionnaire/Questionnaire';
import { checkIfDataExpired } from '../../../../helpers';
import { fetchImageLinksAction } from '../../../../actions';
import { connect } from 'react-redux';
import LoadingGrayCard from '../../../Loading/LoadingGrayCard/LoadingGrayCard';


const LCol = ({ children, ...rest }) => (
    <Col md={6} xl={3} {...rest}>
        {children}
    </Col>
);

class QuestionnaireAndImageLinks extends Component {
    componentDidMount() {
        this.fetchImageLinksData();
    }

    fetchImageLinksData = () => {
        const { date } = this.props.imageLinks;
        const { fetchImageLinks } = this.props;
        checkIfDataExpired(fetchImageLinks, date, 180);
    };

    render() {
        const { imageLinks, loading } = this.props.imageLinks;
        return (
            <Container className="questionnaire-and-image-links">
                <Row className="gutters-sm">
                    {[1, 2, 3].map(item => (
                        <LCol key={item}>
                            {(loading || imageLinks[item] === null) && <LoadingGrayCard/>}
                            {(!loading && imageLinks[item] !== null) && (
                                <ImageLink
                                    variant={imageLinks[item].variant}
                                    title={imageLinks[item].title}
                                    category={imageLinks[item].subtitle}
                                    img={imageLinks[item].photoUrl}
                                    alt={imageLinks[item].title}
                                    to={imageLinks[item].url}
                                    internal={imageLinks[item].internal_url}
                                />
                            )}
                        </LCol>
                    ))}
                    <LCol className="questionnaire-container">
                        <Questionnaire/>
                    </LCol>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = ({ imageLinks }) => ({ imageLinks });
export default connect(mapStateToProps, {
    fetchImageLinks: fetchImageLinksAction,
})(QuestionnaireAndImageLinks);