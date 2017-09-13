/**
 * @Author: WangChao
 * @Date:   2017-09-04T14:34:57+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-07T20:25:38+08:00
 */

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
import { Navbar, ToolBar, Recommend, BuyTicketNow, BuyParkingCoupon, BuyHotelTickets } from '../component';
import { isHotDetailLoaded, getHotDetailBy } from '../module/hotdetail';
import { addTicketToShoppingcart } from '../../Shoppingcart/module/shoppingcartV2';
import { convertElementsToComponet } from '../../../utils/elements';
import { appendQiNiuQueryParamsForImageUrl } from '../../../helpers/QiNiuHelpers';
import { jumpToWeChatAuthorizationUrl } from '../../../utils/wechat';
import { isEmptyObject } from '../../Login/module/login';

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
        authHeaders: state.login.authHeaders,
        hotDetail: state.hotdetail.hotDetail,
        hotDetailError: state.hotdetail.hotDetailError,

        addTicketToShoppingcartLoaded: state.shoppingcart.addTicketToShoppingcartLoaded,
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
            showBuyTicketNow: false,
            showBuyHotelTicketNow: false,
            showBuyParkingNow: false,
            paying: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const { addTicketToShoppingcartLoaded, addTicketToShoppingcartError } = nextProps
        if (addTicketToShoppingcartError && addTicketToShoppingcartError !== this.props.addTicketToShoppingcartError) {
            message.error('添加至购物车失败, 请稍后重试...')
        } else if (addTicketToShoppingcartLoaded && addTicketToShoppingcartLoaded !== this.props.addTicketToShoppingcartLoaded) {
            message.success('添加至购物车成功!')
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
        this.setState({
            showBuyTicketNow: false,
            showBuyHotelTicketNow: false,
            showBuyParkingNow: false
        });
    }

    _handleClickToolBar(e) {
        e.preventDefault();
        const { classify_type: classifyType, direct_sales: directSales } = this.props.hotDetail;
        if (directSales === 'yes123') {
            const { tickets } = this.props.hotDetail;
            location.href = `/pay/ticketinfo/${tickets[0].id}`;
        } else if (classifyType === 'parking') {
            // this.setState({ showBuyParkingNow: true })
            this.setState({ showBuyTicketNow: true })
        } else if (classifyType === 'tickets') {
            this.setState({ showBuyTicketNow: true })
        } else if (classifyType === 'hotel') {
            this.setState({ showBuyHotelTicketNow: true })
        }
    }

    render() {
        if (!this.props.hotDetail || isEmptyObject(this.props.hotDetail)) {
            console.log(JSON.stringify(this.props.hotDetailError));
            return (<PageNotExist />)
        }
        const styles = require('./HotDetail.scss');
        const contentWrapStyle = {
            maxHeight: this.state.contentWrapMaxHeight,
            overflow: this.state.contentWrapOverflow
        };
        const viewMoreWrapStyle = { display: this.state.viewMoreWrapDisplay };
        // 转换数据
        const { title, slides, content, tickets, recommandation, price } = this.props.hotDetail;
        const { room_type: rooms, start_date: startDate, end_date: endDate } = this.props.hotDetail;
        const { attention, place, location, time_info, classify_type, classify_name, direct_sales, no_tickets } = this.props.hotDetail;
        const ticketsType = classify_name ? (classify_name == '出入口' ? 'doorTicket' : 'ticket') : 'ticket';
        const autoplay = slides && Array.isArray(slides) && slides.length > 1;
        const isNormal = (classify_type === 'normal' || classify_type === undefined);
        const isHotel = classify_type === 'hotel';
        const buyTicketTitle = isHotel ? '购买住宿券' : '购买门票';

        return (
            <div className={styles.detail}>
                <Helmet><title>{title}</title></Helmet>
                {slides &&
                    <div className={styles.carousel}>
                        <Carousel autoplay={autoplay}>
                            { slides.map(element => (<div key={element.id}><CarouselCard carousel={element} /></div>)) }
                        </Carousel>
                    </div>
                }
                <div className={styles.container}>
                    <div className={styles.item}>
                        <div className={styles.title}>{ title }</div>
                        <div style={contentWrapStyle} className={styles.contentWrap} >
                            { content && convertElementsToComponet(content.elements) }
                        </div>
                        <div style={viewMoreWrapStyle} className={styles.viewMoreWrap} onClick={this.handleClickViewMore}>
                            <div className={styles.gradient} />
                            <div className={styles.viewMore}> <span>查看全部</span> <img src="/assets/arrow_down_white.png" alt="viewMore"/></div>
                        </div>
                    </div>
                    {(time_info && time_info.length > 0)&&
                        <div className={styles.item}>
                            <div className={classNames(styles.tip)}>活动时间</div>
                            <div className={classNames(styles.textOfWhiteSpaceDeal, styles.activityTime)}>{time_info}</div>
                        </div>
                    }
                    {(place && place.length > 0) &&
                        <div className={styles.item}>
                            <div className={classNames(styles.tip)}>场馆</div>
                            <div className={styles.activityLocation}>{place}</div>
                        </div>
                    }
                    {(attention && attention.length > 0) &&
                        <div className={styles.item}>
                            <div className={classNames(styles.tip)}>注意事项</div>
                            <div className={classNames(styles.textOfWhiteSpaceDeal, styles.attention)}>{attention}</div>
                        </div>
                    }
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
                {((classify_type != 'normal' || direct_sales == 'yes') && (tickets && tickets.length > 0) ) &&
                    <ToolBar price={price || 0} onClickBuyTicketNow={this.handleClickToolBar} />
                }
                {(no_tickets === 'yes') && <div className={styles.noTickets}><span>门票已售完</span></div>}

                {(tickets && tickets.length > 0 && rooms && rooms.length > 0) &&
                    <BuyHotelTickets
                        title="酒店预订"
                        show={this.state.showBuyHotelTicketNow}
                        startDate={startDate}
                        endDate={endDate}
                        tickets={tickets}
                        rooms={rooms}
                        onClickCancel={this.handleClickCancel}
                        pushState={this.props.push}
                    />
                }
                {(tickets && tickets.length > 0) &&
                    <BuyTicketNow
                        title={buyTicketTitle}
                        ticketsType={ticketsType}
                        tickets={tickets}
                        show={this.state.showBuyTicketNow}
                        onClickCancel={this.handleClickCancel}
                        onClickBuyTicketNow={this.handleClickBuyTicketNow}
                        onClickAddToCart={this.handleClickAddToCart}
                    />
                }
                {/* <BuyParkingCoupon show={this.state.showBuyParkingNow} onClickCancel={this.handleClickCancel} /> */}
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
