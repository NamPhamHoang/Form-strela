import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Socials = props => {
    return (
        <div className="d-flex socials">
            <a href="https://www.facebook.com/gminajarocin" className="mx-1 fb">
                <FontAwesomeIcon icon={faFacebookF} fixedWidth/>
            </a>
            {/*
            <a href="/todo" className="mx-1 ig">
                <FontAwesomeIcon icon={faInstagram} fixedWidth/>
            </a>
            */}
            <a href="https://www.youtube.com/channel/UC2MX8NbC0ooLAnwhaAnCbag" className="mx-1 yt">
                <FontAwesomeIcon icon={faYoutube} fixedWidth/>
            </a>
            <a href="https://twitter.com/gminajarocin" className="mx-1 tw">
                <FontAwesomeIcon icon={faTwitter} fixedWidth/>
            </a>
        </div>
    );
};

export default Socials;