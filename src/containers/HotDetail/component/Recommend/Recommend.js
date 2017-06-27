import React from 'react';
import PropTypes from 'prop-types';

export default class Recommend extends React.Component {
    render() {
        const styles = require('./Recommend.scss');
        const imageUrl = "http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/31/A447C7528DCFB0B61C68D6C525AA6714";
        const style = {
            backgroundImage: 'url('+ imageUrl +')'
        };
        return (
            <div className={styles.cover} style={style}>
                <span className={styles.title}>2016英雄传说亚洲巅峰</span>
            </div>
        );
    }
}
