import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Carousel } from 'antd';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { CoverImage, TitleElement, TextElement, ImageElement, BigImageElement } from '../../../components';
import { Navbar, ToolBar, Recommend, BuyTicketNow, BuyParkingCoupon } from '../component';
import { isHotDetailLoaded, getHotDetailBy } from '../module/hotdetail';
import { convertElementsToComponet } from '../../../utils/elements';

@asyncConnect([{
    deferred: true,
    promise: ({ params, store: { dispatch, getState }, helpers }) => {
        if (!isHotDetailLoaded(getState())) {
            return dispatch(getHotDetailBy(params.id))
        }
    }
}])

@connect(
    state => ({ hotDetail: state.hotdetail.hotDetail })
)

export default class HotDetail extends React.Component {
    constructor() {
        super();
        this.handleClickViewMore = (e) => this._handleClickViewMore(e);
        this.handleClickBuyTicketNow = (e) => this._handleClickBuyTicketNow(e);
        this.handleClickAddToCart = (e) => this._handleClickAddToCart(e);
        this.handleClickCancel = (e) => this._handleClickCancel(e);
        this.state = {
            contentWrapMaxHeight: '175px',
            contentWrapOverflow: 'hidden',
            viewMoreWrapDisplay: 'block',
            showBuyTicketNow: false,
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

    _handleClickBuyTicketNow(e) {
        e.preventDefault();
        this.setState({ showBuyTicketNow: true });
    }

    _handleClickAddToCart(e) {
        e.preventDefault();
    }

    _handleClickCancel(e) {
        e.preventDefault();
        this.setState({ showBuyTicketNow: false });
    }

    render() {
        if (!this.props.hotDetail) return null;
        const styles = require('./HotDetail.scss');
        const contentWrapStyle = {
            maxHeight: this.state.contentWrapMaxHeight,
            overflow: this.state.contentWrapOverflow
        };
        const viewMoreWrapStyle = { display: this.state.viewMoreWrapDisplay };
        // 转换数据
        const { title, elements, content, attention, place, location, time_info } = this.props.hotDetail;

        return (
            <div className={styles.detail}>
                <Navbar />
                <div className={styles.carousel}>
                    <Carousel autoplay>
                        { elements && elements.map(element => (<div key={element.id}><CarouselCard carousel={element} /></div>)) }
                    </Carousel>
                </div>
                <div className={styles.container}>
                    <div className={styles.item}>
                        <div className={styles.title}>{ title }</div>
                        <div style={contentWrapStyle} className={styles.contentWrap} >
                            { convertElementsToComponet(content.elements) }
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
                        <div className={classNames(styles.textOfWhiteSpaceDeal, styles.activityTime)}>{time_info}</div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>场馆</div>
                        <div className={styles.activityLocation}>{place}</div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>注意事项</div>
                        <div className={classNames(styles.textOfWhiteSpaceDeal, styles.attention)}>{attention}</div>
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
                <ToolBar onClickBuyTicketNow={this.handleClickBuyTicketNow} onClickAddToCart={this.handleClickAddToCart} />
                {/* <BuyTicketNow show={this.state.showBuyTicketNow} onClickCancel={this.handleClickCancel} /> */}
                <BuyParkingCoupon show={this.state.showBuyTicketNow} onClickCancel={this.handleClickCancel} />
            </div>
        );
    }
}

class CarouselCard extends React.Component {
    static propTypes = {
        carousel: PropTypes.object,
    };
    render() {
        const styles = require('./HotDetail.scss');
        const { content: { name: imageUrl } } = this.props.carousel;
        return (
            <a className={styles.carouselCard}>
                <img src={imageUrl} alt="cover"/>
            </a>
        );
    }
}
