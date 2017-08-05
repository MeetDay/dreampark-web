import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { message } from 'antd';
import classNames from 'classnames';
import { Carousel } from 'antd';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-async-connect';
import { connect } from 'react-redux';
import { TitleElement, PageNotExist } from '../../../components';
import { Navbar, ToolBar, Recommend, BuyTicketNow, BuyParkingCoupon } from '../component';
import { isHotDetailLoaded, getHotDetailBy } from '../module/hotdetail';
import { addTicketToShoppingcart } from '../../Shoppingcart/module/shoppingcartV2';
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
        hotDetail: state.hotdetail.hotDetail,

        addTicketToShoppingcart: state.shoppingcart.addTicketToShoppingcart,
        addTicketToShoppingcartError: state.shoppingcart.addTicketToShoppingcartError
    }),
    dispatch => bindActionCreators({ push, addTicketToShoppingcart }, dispatch)
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

    componentWillReceiveProps(nextProps) {
        const { addTicketToShoppingcartError } = nextProps
        if (addTicketToShoppingcartError && addTicketToShoppingcartError !== this.props.addTicketToShoppingcartError) {
            message.error('添加至购物车失败, 请稍后重试...')
        }
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
        if (this.props.user) {
            this.props.push(`/pay/ticketinfo/${selectedTicket.id}`)
        } else {
            jumpToWeChatAuthorizationUrl(location)
        }
    }

    _handleClickAddToCart(selectedTicket) {
        if (this.props.user) {
            this.props.addTicketToShoppingcart(selectedTicket.id)
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
        const { title, slides, content, tickets, recommandation, price } = this.props.hotDetail;
        const { attention, place, location, time_info, classify_type, no_tickets } = this.props.hotDetail;
        const isHotel = classify_type === 'hotel', isTicket = classify_type === 'tickets', isParking = classify_type === 'parking', isNormal = (classify_type === 'normal' || classify_type === undefined);
        const buyTicketTitle = isHotel ? '购买住宿券' : isTicket ? '购买门票' : ''

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
                            <div className={styles.gradient} />
                            <div className={styles.viewMore}> <span>查看全部</span> <img src="/assets/checked_cart.png" alt="viewMore"/></div>
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
                    {(recommandation && recommandation.length > 0) &&
                        <div className={styles.item}>
                            <div className={classNames(styles.tip)}>相关推荐</div>
                            <div className={styles.recommend}>
                                <div className={styles.recommendWarp}>
                                    { recommandation && recommandation.map(recommend => <Recommend key={recommend.id} recommend={recommend} />) }
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {(no_tickets === 'no') &&
                    <div>
                        {!isNormal && <ToolBar price={price || 0} onClickBuyTicketNow={this.handleClickToolBar} />}
                        {(isHotel || isTicket) && <BuyTicketNow title={buyTicketTitle} tickets={tickets} show={this.state.showBuyTicketNow} onClickCancel={this.handleClickCancel} onClickBuyTicketNow={this.handleClickBuyTicketNow} onClickAddToCart={this.handleClickAddToCart} />}
                        {isParking && <BuyParkingCoupon show={this.state.showBuyTicketNow} onClickCancel={this.handleClickCancel} />}
                    </div>
                }
                {(no_tickets === 'yes') &&
                    <div className={styles.noTickets}><span>门票已售完</span></div>
                }
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
