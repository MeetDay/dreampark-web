import React from 'react';
import PropTypes from 'prop-types';
import { appendQiNiuQueryParamsForImageUrl } from '../../../helpers/QiNiuHelpers'

export default class BigImageElement extends React.Component {
    static propTypes = {
        src: PropTypes.string,
        captionText: PropTypes.string
    }
    render() {
        const styles = require('../Element.scss');
        // const imageUrl = "http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/194/C2F1F0169AEF2A0B768C4274831E78DD";
        return (
            <div className={styles.bigImageElement}>
                <img src={appendQiNiuQueryParamsForImageUrl(this.props.src)} alt="image" />
                <div>{this.props.captionText}</div>
            </div>
        );
    }
}
