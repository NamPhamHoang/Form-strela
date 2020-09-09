import React from 'react';
import PropTypes from 'prop-types';
import Path from '../components/Path/Path';
import LayoutCardWithTitles from '../components/Cards/LayoutCards/LayoutCardWithTitles';

const LayoutCardWithTitleAndPath = props => {
    return (
        <>
            <Path items={props.pathItems} />
            <LayoutCardWithTitles title={props.title} className={props.className}>
                {props.children}
            </LayoutCardWithTitles>
        </>
    );
};

LayoutCardWithTitleAndPath.propTypes = {
    pathItems: PropTypes.instanceOf(Array).isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
};

LayoutCardWithTitleAndPath.defaultProps = {
    className: '',
};

export default LayoutCardWithTitleAndPath;
