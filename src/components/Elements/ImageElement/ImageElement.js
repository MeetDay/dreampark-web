import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ImageElement extends React.Component {
    render() {
        const styles = require('../Element.scss');
        const imageUrl = "http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/35/7224B55373DFC21D68622692CC4BA5C0";
        return (
            <div className={styles.image}>
                <img src={imageUrl} alt="image" />
            </div>
        );
    }
}
