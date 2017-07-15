import React from 'react'
import PropTypes from 'prop-types'

export default class SearchItem extends React.Component {
    static propTypes = {
        
    }

    render() {
        const styles = require('./SearchItem.scss')
        const imageUrl = 'http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/28/E66E646FE2400643EC6D582F262D1EAA'
        const backgroundStyle = {
            width: '100%',
            height: '100%',
            verticalAlign: 'top',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
         }
        return (
            <div className={styles.item}>
                <a href="/hotdetail/1">
                    <div className={styles.contentWrap}>
                        <span className={styles.cover}><div style={backgroundStyle} /></span>
                        <span className={styles.title}>梦想车展</span>
                        <span className={styles.arrow}><img src="/assets/go_detail_gray.png" alt="arrow" /></span>
                    </div>
                </a>
            </div>
        );
    }
}
