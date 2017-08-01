import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { Carousel } from 'antd';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { TitleElement, PageNotExist } from '../../../components';
import { Navbar, ToolBar, Recommend, BuyTicketNow, BuyParkingCoupon } from '../component';
import { isHotDetailLoaded, getHotDetailBy } from '../module/hotdetail';
import { convertElementsToComponet } from '../../../utils/elements';
import { appendQiNiuQueryParamsForImageUrl } from '../../../helpers/QiNiuHelpers';
import { jumpToWeChatAuthorizationUrl } from '../../../utils/wechat'
import { isEmptyObject } from '../../Login/module/login'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store: { dispatch, getState }, helpers }) => {
        if (!isHotDetailLoaded(getState())) {
            return dispatch(getHotDetailBy(params.id))
        }
    }
}])

@connect(
    state => ({
        user: state.login.user,
        hotDetail: state.hotdetail.hotDetail
    }),
    dispatch => bindActionCreators({ push }, dispatch)
)

export default class HotDetail extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickViewMore = (e) => this._handleClickViewMore(e);
        this.handleClickCancel = (e) => this._handleClickCancel(e);
        this.handleClickToolBar = (e) => this._handleClickToolBar(e);
        this.handleClickBuyTicketNow = (selectedTicket) => this._handleClickBuyTicketNow(selectedTicket);
        this.handleClickAddToCart = (selectedTicket) => this._handleClickAddToCart(selectedTicket);

        this.state = {
            contentWrapMaxHeight: '175px',
            contentWrapOverflow: 'hidden',
            viewMoreWrapDisplay: 'block',
            showBuyTicketNow: false
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

    _handleClickBuyTicketNow(selectedTicket) {
        console.log(selectedTicket)
        if (this.props.user) {
            this.props.push('/buyticket/ticketinfo/1')
        } else {
            jumpToWeChatAuthorizationUrl(location)
        }
    }

    _handleClickAddToCart(selectedTicket) {
        console.log(selectedTicket)
        if (this.props.user) {
            
        } else {
            jumpToWeChatAuthorizationUrl(location)
        }
    }

    _handleClickCancel(e) {
        e.preventDefault();
        this.setState({ showBuyTicketNow: false });
    }

    _handleClickToolBar(e) {
        e.preventDefault();
        this.setState({ showBuyTicketNow: true });
    }

    render() {
        if (!this.props.hotDetail || isEmptyObject(this.props.hotDetail)) return (<PageNotExist />);
        const styles = require('./HotDetail.scss');
        const contentWrapStyle = {
            maxHeight: this.state.contentWrapMaxHeight,
            overflow: this.state.contentWrapOverflow
        };
        const viewMoreWrapStyle = { display: this.state.viewMoreWrapDisplay };
        // 转换数据
        const { title, slides, content, attention, place, location, time_info, price } = this.props.hotDetail;
        return (
            <div className={styles.detail}>
                <Helmet><title>{title}</title></Helmet>
                <div className={styles.carousel}>
                    <Carousel autoplay>
                        { slides && slides.map(element => (<div key={element.id}><CarouselCard carousel={element} /></div>)) }
                    </Carousel>
                </div>
                <div className={styles.container}>
                    <div className={styles.item}>
                        <div className={styles.title}>{ title }</div>
                        <div style={contentWrapStyle} className={styles.contentWrap} >
                            { content && convertElementsToComponet(content.elements) }
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
                <ToolBar price={price || 0} onClickBuyTicketNow={this.handleClickToolBar} />
                <BuyTicketNow
                    show={this.state.showBuyTicketNow}
                    onClickCancel={this.handleClickCancel}
                    onClickBuyTicketNow={this.handleClickBuyTicketNow}
                    onClickAddToCart={this.handleClickAddToCart}
                />
                {/* <BuyParkingCoupon show={this.state.showBuyTicketNow} onClickCancel={this.handleClickCancel} /> */}
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
                <img src={appendQiNiuQueryParamsForImageUrl(imageUrl)} alt="cover"/>
            </a>
        );
    }
}
