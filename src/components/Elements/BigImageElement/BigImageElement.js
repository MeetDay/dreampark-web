import React from 'react';
import PropTypes from 'prop-types';

export default class BigImageElement extends React.Component {
    render() {
        const styles = require('../Element.scss');
        const imageUrl = "http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/194/C2F1F0169AEF2A0B768C4274831E78DD";
        return (
            <div className={styles.bigImageElement}>
                <img src={imageUrl} alt="image" />
                <div>10月4日，在大漠之城阿拉善，结束了为期三天的首届腾格里国际音乐节。</div>
            </div>
        );
    }
}
