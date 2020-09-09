import React from 'react';
import AnimationWrapper from "./AnimationWrapper";

const Description = ({description}) => {
    return (
        <AnimationWrapper>
            <div dangerouslySetInnerHTML={{__html: description}}/>
        </AnimationWrapper>
    );
}

export default Description;