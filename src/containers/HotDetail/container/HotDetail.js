import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CoverImage, TitleElement, TextElement, ImageElement, BigImageElement } from '../../../components';
import { Navbar, ToolBar, Recommend } from '../component';

export default class HotDetail extends React.Component {
    constructor() {
        super();
        this.handleClickViewMore = (e) => this._handleClickViewMore(e);
        this.state = {
            contentWrapMaxHeight: '175px',
            contentWrapOverflow: 'hidden',
            viewMoreWrapDisplay: 'block',

        };
    }

    _handleClickViewMore(e) {
        e.preventDefault();
        this.setState({
            contentWrapMaxHeight: 'none',
            contentWrapOverflow: 'visible',
            viewMoreWrapDisplay: 'none'
        });
    }

    render() {
        const styles = require('./HotDetail.scss');
        const contentWrapStyle = {
            maxHeight: this.state.contentWrapMaxHeight,
            overflow: this.state.contentWrapOverflow
        };
        const viewMoreWrapStyle = { display: this.state.viewMoreWrapDisplay };

        const imageUrl = "http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/26/DD76A2DF7CC999FBCDCC9FB28AA4F64E";
        return (
            <div className={styles.detail}>
                <Navbar />
                <CoverImage height={200} src={imageUrl} />
                <div className={styles.container}>
                    <div className={styles.item}>
                        <div className={styles.title}>梦想车展</div>
                        <div style={contentWrapStyle} className={styles.contentWrap} >
                            <TextElement />
                            <TextElement />
                            <ImageElement />
                            <TextElement />
                            <BigImageElement />
                            <TextElement />
                        </div>
                        <div style={viewMoreWrapStyle} className={styles.viewMoreWrap} onClick={this.handleClickViewMore}>
                            <div className={styles.gradient}/>
                            <div className={styles.viewMore}>
                                <span>查看全部</span>
                                <img src="/assets/checked_cart.png" alt="viewMore"/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>活动时间</div>
                        <div className={styles.activityTime}>10月1日下午3:30 - 10月1日下午4:30</div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>场馆</div>
                        <div className={styles.activityLocation}>梦想车展中央广场</div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>注意事项</div>
                        <div className={styles.attention}>请勿翻越护栏，文明牌照。未满18岁的儿童需成人陪同参观。</div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>相关推荐</div>
                        <div className={styles.recommend}>
                            <div className={styles.recommendWarp}>
                                <Recommend />
                                <Recommend />
                                <Recommend />
                                <Recommend />
                                <Recommend />
                            </div>
                        </div>
                    </div>
                </div>
                <ToolBar />
            </div>
        );
    }
}
