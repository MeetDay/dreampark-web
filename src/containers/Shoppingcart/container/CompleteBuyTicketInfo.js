import React from 'react';
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Modal, message, Spin } from 'antd';
import * as Constant from '../../../utils/constant';
import APIClient from '../../../helpers/APIClient';
import { isEmptyObject } from '../../Login/module/login';
import { PageNotExist } from '../../../components'
import { isTicketInfoLoaded, getTicketInfoBy, updateTicketInfo, addContact, isTicketOrderInfoLoaded, getTicketOrderInfoBy, payment, submitTicketOrder } from '../module/shoppingcartV2';
import { Phone } from '../../../components';
import { clearWhiteSpaceOf, illegalCardNumber } from '../../../utils/regex';
import { convertToLocalDate } from '../../../utils/dateformat'

const IDCARD_TEXT_MAX_LENGTH = 18;
const USERNAME_TEXT_MAX_LENGTH = 20;
const TICKET_PAY_FAIL = '支付失败, 请重新支付';
const TICKET_PAY_CANCEL = '支付已取消, 请重新支付';
const TICKET_PAY_SUCCESS = '出票成功';
const CONTACT_WARNNING_MESSAGE = '请输入正确的姓名和身份证号码';

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ dispatch, getState }, location, helpers }) => {
        const query = location.query;
        if (query.ticketType == 'ticketorder' && !isTicketOrderInfoLoaded(getState())) {
            return dispatch(getTicketOrderInfoBy(params.id))
        } else if (!isTicketInfoLoaded(getState())) {
            return dispatch(getTicketInfoBy(params.id))
        }
    }
}])

@connect(
    state => ({
        authHeaders: state.login.authHeaders,
        contactLoading: state.shoppingcart.contactLoading,
        contactError: state.shoppingcart.contactError,
        contact: state.shoppingcart.contact,
        ticketInfo: state.shoppingcart.ticketInfo,
        isHotelTicketInfo: state.shoppingcart.isHotelTicketInfo,
        contactList: state.shoppingcart.contactList,
        checkedContactsNoInsurance: state.shoppingcart.checkedContactsNoInsurance,

        isTicketOrderInfo: state.shoppingcart.isTicketOrderInfo,
        hasInsurance: state.shoppingcart.ticketInfo ? state.shoppingcart.ticketInfo.is_insurance === 1 : false,
        // insurancePrice: state.shoppingcart.ticketInfo ? state.shoppingcart.ticketInfo.insurance_price || 0 : 0,
        insurancePrice: 0,

        generatorTicketOrderLoading: state.shoppingcart.generatorTicketOrderLoading,
        generatorTicketOrder: state.shoppingcart.generatorTicketOrder,
        generatorTicketOrderError: state.shoppingcart.generatorTicketOrderError,

        paymentLoading: state.shoppingcart.paymentLoading,
        paymentObject: state.shoppingcart.paymentObject,
        paymentError: state.shoppingcart.paymentError
    }),
    dispatch => bindActionCreators({ push, addContact, updateTicketInfo, payment, submitTicketOrder }, dispatch)
)

export default class CompleteBuyTicketInfo extends React.Component {
    constructor(props) {
        super(props)
        this.handleClickInsurance = (e) => this._handleClickInsurance(e)
        this.handleClickPayment = (e) => this._handleClickPayment(e)
        this.handleClickCancel = (e) => this._handleClickCancel(e)
        this.onUsernameChange = (e) => this._onUsernameChange(e)
        this.onCardNumberChange = (e) => this._onCardNumberChange(e)
        this.handleClickFinished = (e) => this._handleClickFinished(e)

        this.contactChecked = (checkedContact) => this._contactChecked(checkedContact)
        this.addContact = () => this._addContact()

        // query 参数
        const { hotelTicketInfo, goodsInfo } = props.location.query;
        if (hotelTicketInfo) {
            const parsedHotelTicketInfo = JSON.parse(hotelTicketInfo);
            if (parsedHotelTicketInfo && !isEmptyObject(parsedHotelTicketInfo)) {
                this.parsedHotelTicketInfo = parsedHotelTicketInfo;
                this.isHotelTicketInfo = true;
            }
        }
        if (goodsInfo) {
            const parsedGoodsInfo = JSON.parse(goodsInfo);
            if (parsedGoodsInfo && !isEmptyObject(parsedGoodsInfo)) {
                this.goodsFromShoppingcart = true;
                this.goodsID = parsedGoodsInfo.goodsID;
            }
        }

        let totalPrice = props.ticketInfo ? (props.isTicketOrderInfo ? Number(props.ticketInfo.amount).toFixed(2) : Number(props.ticketInfo.price).toFixed(2)) : 0;
        if (this.isHotelTicketInfo) {
            totalPrice = Number(this.parsedHotelTicketInfo.price).toFixed(2);
        }

        // 酒店订单
        if (props.isHotelTicketInfo) {
            this.isHotelTicketInfo = props.isHotelTicketInfo;
        }

        const checkedContacts = props.ticketInfo ? (props.isTicketOrderInfo ? [...props.contactList] : ((props.contactList && props.contactList.length > 0) ? [props.contactList[0]] : [])) : [];
        this.state = {
            paying: false,
            showAddContact: false,
            username: '',
            idCardNo: '',
            checkedContacts: checkedContacts,
            totalPrice: totalPrice,
            // checkedContactsNoInsurance: props.checkedContactsNoInsurance,
            // totalPrice: props.ticketInfo ? (props.isTicketOrderInfo ? Number(props.ticketInfo.amount).toFixed(2) : Number(props.ticketInfo.price).toFixed(2)) : 0,
            // totalPrice: props.ticketInfo ? (props.isTicketOrderInfo ? Number(props.ticketInfo.amount).toFixed(2) : Number(props.ticketInfo.price + props.insurancePrice*props.checkedContactsNoInsurance.length).toFixed(2)) : 0,
        }
    }

    componentWillMount() {
        if (this.isHotelTicketInfo && this.parsedHotelTicketInfo) {
            this.props.updateTicketInfo(this.parsedHotelTicketInfo);
        }
    }

    componentWillReceiveProps(nextProps) {
        // 添加联系人
        const { contact, contactError } = nextProps
        if (contact && contact !== this.props.contact) {
            this.setState({ showAddContact: false, username: '', idCardNo: '' });
        } else if (contactError && contactError !== this.props.contactError) {
            message.error(contactError.error_message);
        }
    }

    _handleClickPayment(e) {
        e.preventDefault()
        this.setState({ paying: true });
        if (this.props.isTicketOrderInfo) {
            const cookies = new Cookies()
            const openID = cookies.get(Constant.USER_OPENID)
            const client = new APIClient();
            client.post('/charge', { headers: this.props.authHeaders, data: { id: this.props.ticketInfo.orders_id, amount: this.props.ticketInfo.amount, open_id: openID, pay_type: 'wx_pub' } })
                .then(charge => {
                    if (charge && !isEmptyObject(charge)) {
                        // 设置支付超时时间为60秒
                        const paymentID = setTimeout(_ => {
                            message.error(TICKET_PAY_FAIL);
                            this.setState({ paying: false });
                        }, 60000);
                        pingpp.createPayment(charge, (result, error) => {
                            if (result == 'success') {
                                clearTimeout(paymentID);
                                client.post('/check_charge', { headers: this.props.authHeaders, data: { charge_id: charge.id, order_no: charge.orderNo } })
                                    .then(result => { this.props.push('/tickets'); this.setState({ paying: false }); message.success(TICKET_PAY_SUCCESS); })
                                    .catch(error => { this.props.push('/tickets?type=unpaid'); this.setState({ paying: false }); message.error(error.error_message); })
                            } else if (result == 'fail' ) {
                                this.setState({ paying: false });
                                message.error(TICKET_PAY_FAIL)
                            } else if (result == 'cancel') {
                                this.setState({ paying: false });
                                message.info(TICKET_PAY_CANCEL)
                            }
                        })
                    } else {
                        return Promise.reject({ code: 10099, error_message: '支付失败, charge对象为空' })
                    }
                })
                .catch(error => { this.setState({ paying: false }); message.error(error.error_message) })
        } else {
            let ticketInfo = {
                amount: this.state.totalPrice,
                ticket: {
                    id: this.props.ticketInfo.id,
                    contacters: this.state.checkedContacts.map(contact => contact.id)
                }
            };
            const client = new APIClient();
            if (this.state.totalPrice == 0) {
                if (this.goodsFromShoppingcart) {
                    ticketInfo = Object.assign({ cart_id: this.goodsID }, ticketInfo);
                }
                client.post('/add_order', { headers: this.props.authHeaders, data: ticketInfo })
                    .then(orderInfo => client.post('/free', { headers: this.props.authHeaders, data: { id: orderInfo.orders_id } }))
                    .then(result => { this.props.push('/tickets'); this.setState({ paying: false }); message.success(TICKET_PAY_SUCCESS); })
                    .catch(error => { message.error(error.error_message); this.setState({ paying: false }); this.props.push('/tickets?type=unpaid') })
            } else {
                const cookies = new Cookies()
                const openID = cookies.get(Constant.USER_OPENID)
                if (this.isHotelTicketInfo) {
                    ticketInfo = Object.assign({
                        total: Number(this.props.ticketInfo.price).toFixed(2),
                        room_type_id: this.props.ticketInfo.type_id,
                        room_type: this.props.ticketInfo.type_name,
                        start_date: this.props.ticketInfo.start_time,
                        end_date: this.props.ticketInfo.end_time
                    }, ticketInfo);
                } else if (this.goodsFromShoppingcart) {
                    ticketInfo = Object.assign({ cart_id: this.goodsID }, ticketInfo);
                }

                client.post('/add_order', { headers: this.props.authHeaders, data: ticketInfo })
                    .then(orderInfo => client.post('/charge', { headers: this.props.authHeaders, data: { id: orderInfo.orders_id, amount: ticketInfo.amount, open_id: openID, pay_type: 'wx_pub' }}))
                    .then(charge => {
                        if (charge && !isEmptyObject(charge)) {
                            // 设置支付超时时间为60秒
                            const paymentID = setTimeout(_ => {
                                message.error(TICKET_PAY_FAIL);
                                this.setState({ paying: false });
                            }, 60000);
                            pingpp.createPayment(charge, (result, error) => {
                                if (result == 'success') {
                                    clearTimeout(paymentID);
                                    client.post('/check_charge', { headers: this.props.authHeaders, data: { charge_id: charge.id, order_no: charge.orderNo } })
                                    .then(result => { this.props.push('/tickets'); this.setState({ paying: false }); message.success(TICKET_PAY_SUCCESS); })
                                    .catch(error => { this.props.push('/tickets?type=unpaid'); this.setState({ paying: false }); message.error(error.error_message); })
                                } else if (result == 'fail' ) {
                                    this.setState({ paying: false });
                                    message.error(TICKET_PAY_FAIL);
                                } else if (result == 'cancel') {
                                    this.setState({ paying: false });
                                    message.info(TICKET_PAY_CANCEL);
                                }
                            })
                        } else {
                            return Promise.reject({ code: 10099, error_message: '支付失败, charge对象为空' })
                        }
                    })
                    .catch(error => { this.setState({ paying: false }); message.error(error.error_message) })
            }
        }
    }

    _contactChecked(checkedContact) {
        if (this.state.paying) return;
        const { insurancePrice } = this.props;
        const { price } = this.props.ticketInfo
        if (this.existedContact(this.state.checkedContacts, checkedContact)) {
            if (this.state.checkedContacts.length > 1) {
                const results = this.state.checkedContacts.filter(contact => contact.identity_card !== checkedContact.identity_card);
                // const noInsuranceContacts = results.filter(contact => contact.insurant != 'yes');
                this.setState({
                    checkedContacts: [...results],
                    totalPrice: Number(price*results.length).toFixed(2),
                    // checkedContactsNoInsurance: [...noInsuranceContacts],
                    // totalPrice: Number(price*results.length + insurancePrice*noInsuranceContacts.length).toFixed(2),
                })
            }
        } else {
            const checkedContacts = [...this.state.checkedContacts, checkedContact];
            // const noInsuranceContacts = checkedContacts.filter(contact => contact.insurant != 'yes');
            this.setState({
                checkedContacts: checkedContacts,
                totalPrice: Number(price*checkedContacts.length).toFixed(2)
                // checkedContactsNoInsurance: [...noInsuranceContacts],
                // totalPrice: Number(price*checkedContacts.length + insurancePrice*noInsuranceContacts.length).toFixed(2)
            })
        }
    }

    // 控制显示隐藏添加常用联系人的弹窗
    _addContact() {
        if (this.state.paying) return;
        this.setState({ showAddContact: true })
    }
    _handleClickCancel(e) {
        e.preventDefault()
        this.setState({ showAddContact: false, username: '', idCardNo: '' })
    }

    // 添加常用联系人
    _onUsernameChange(e) {
        e.preventDefault()
        const usernameText = e.target.value;
        const usernameTextWithNoWhiteSpace = clearWhiteSpaceOf(usernameText);
        if (usernameTextWithNoWhiteSpace.length <= USERNAME_TEXT_MAX_LENGTH) {
            this.setState((preState) => ({ username: usernameTextWithNoWhiteSpace }))
        }
    }
    _onCardNumberChange(e) {
        e.preventDefault()
        const cardText = e.target.value;
        if (clearWhiteSpaceOf(cardText).length <= IDCARD_TEXT_MAX_LENGTH) {
            this.setState({ idCardNo: cardText })
        }
    }

    _handleClickFinished(e) {
        e.preventDefault()
        const username = clearWhiteSpaceOf(this.state.username)
        const idCardNo = clearWhiteSpaceOf(this.state.idCardNo)
        if (username.length > 0 && illegalCardNumber(idCardNo)) {
            this.props.addContact({ name: username, cardno: idCardNo });
        } else {
            message.warning(CONTACT_WARNNING_MESSAGE)
        }
    }

    existedContact(checkedContacts, checkedContact) {
        let existed = false;
        if (checkedContacts && Array.isArray(checkedContacts) && checkedContacts.length > 0) {
            const result = checkedContacts.find(contact => contact.identity_card === checkedContact.identity_card)
            if (result) existed = true
        }
        return existed
    }

    render() {
        if (!this.props.ticketInfo) return (<PageNotExist />);
        const styles = require('./CompleteBuyTicketInfo.scss');
        const pageTitle = this.props.isTicketOrderInfo ? '订单信息' : '补充订单信息';
        const contactTitle = this.props.isTicketOrderInfo ? '联系人' : '请选择联系人';
        const { ticketInfo } = this.props;
        const ticketStartTimeObject = convertToLocalDate(ticketInfo.start_time)
        const ticketEndTimeObject = convertToLocalDate(ticketInfo.end_time)
        return (
            <div>
                <Helmet><title>{pageTitle}</title></Helmet>
                <div className={styles.pageContent}>
                    <div className={styles.ticketInfo}>
                        <span className={styles.ticketImageWrap}><img src="/assets/ticket_border_big.png" alt="ticket"/></span>
                        <div className={styles.ticketDetails}>
                            <div className={styles.ticketDescription}>
                                {!this.isHotelTicketInfo &&
                                    <div className={styles.ticketDescriptionWrap}>
                                        <span className={styles.ticketTitle}>{ticketInfo.ticket_name}</span>
                                        <span className={styles.ticketTimeInfo}>{`${ticketStartTimeObject.date} ${ticketStartTimeObject.week}`}</span>
                                        <span className={styles.ticketDuration}>{`${ticketStartTimeObject.time} - ${ticketEndTimeObject.time}`}</span>
                                    </div>
                                }
                                {this.isHotelTicketInfo &&
                                    <div className={styles.ticketDescriptionWrap}>
                                        <span className={styles.ticketTitle}>{ticketInfo.ticket_name}</span>
                                        <span className={styles.ticketTimeInfo}>{`${ticketStartTimeObject.dotDate}-${ticketEndTimeObject.dotDate}`}</span>
                                        <span className={styles.ticketDuration}>{ticketInfo.type_name}</span>
                                    </div>
                                }
                            </div>
                            <span className={styles.ticketPrice}>{ticketInfo.price == 0 ? '免费' : `￥${ticketInfo.price}`}</span>
                        </div>
                    </div>
                    <div className={styles.contactList}>
                        <div className={styles.contactListHeader}><span>{contactTitle}</span><span>{`已选择: ${this.state.checkedContacts.length}人`}</span></div>
                        {!this.props.isTicketOrderInfo &&
                            <div className={styles.contactListWrap}>
                                {this.props.contactList.map(contact => (<ContactCard key={contact.identity_card} contact={contact} contactChecked={this.contactChecked} checked={this.existedContact(this.state.checkedContacts, contact)} />))}
                                <ContactCard type="add" addContact={this.addContact} />
                            </div>
                        }
                    </div>
                    <div className={styles.checkedContactInfo}>
                        {this.props.isTicketOrderInfo &&
                            this.state.checkedContacts.map(checkedContact => (<SingleInfo key={checkedContact.identity_card} contact={checkedContact} />))
                        }
                    </div>
                    {/* {false &&
                        <div className={styles.insuranceService}>
                            <div className={styles.insuranceServiceWrap}>
                                <span className={styles.imageWrap}><img className={styles.imgsafe} src="/assets/safe.png" alt="safe"/></span>
                                <span className={styles.insuranceText}>{`救援服务保险 ￥${this.props.insurancePrice}×${this.state.checkedContactsNoInsurance.length}`}</span>
                                <span className={styles.imageWrap}>
                                    <a href={this.props.ticketInfo.insurance_link}><img className={styles.goDetailArrow} src="/assets/go_detail_gray.png" alt="goDetail"/></a>
                                </span>
                            </div>
                        </div>
                    } */}
                    {/* {false && <div className={styles.insuranceAttention}><span>注意：联系人左上角的“盾牌”代表该联系人已购买救援服务，无需再次购买！</span></div>} */}
                    {this.isHotelTicketInfo &&  <div className={styles.insuranceAttention}><span>注意：单一联系人代表预订一间房间，请勿多选。</span></div>}
                </div>
                <div className={styles.toolbar}>
                    <Spin spinning={this.state.paying}>
                        <div className={styles.toolbarWrapper}>
                            <div className={styles.price}><span>价格</span><span>{this.state.totalPrice == 0 ? '免费' : `￥${this.state.totalPrice}`}</span></div>
                            <div onClick={this.handleClickPayment} className={styles.nextStep}><span>去支付</span></div>
                        </div>
                    </Spin>
                </div>
                {this.state.showAddContact &&
                    <div>
                        <Modal style={{ top: 10 }} visible={this.state.showAddContact} title={<div className={styles.addContactTitle}>新增联系人</div>} footer={null} onCancel={this.handleClickCancel}>
                            <div className={styles.addContactContent}>
                                <div className={styles.addContactAttention}>
                                    <span>注意</span>
                                    <span>系统将验证身份证号码与姓名是否匹配，根据活动要求及保险政策必须使用真实的身份信息，否则造成的相关责任由使用者自行承担。</span>
                                </div>
                                <div className={styles.addContactInteraction}>
                                    <Phone type="text" theme="dark" usedFor="other" title="您的真实姓名" zone={false} value={this.state.username} onChange={this.onUsernameChange} />
                                    <Phone type="text" theme="dark" usedFor="idcard" title="身份证号码" zone={false} value={this.state.idCardNo} onChange={this.onCardNumberChange} />
                                    <button disabled={this.props.contactLoading} onClick={this.handleClickFinished} className={styles.finishedButton}>完成</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                }
            </div>
        );
    }
}

class ContactCard extends React.Component {
    static propTypes = {
        checked: PropTypes.bool,
        contact: PropTypes.object,
        contactChecked: PropTypes.func,
        addContact: PropTypes.func,
        type: PropTypes.oneOf(['contact', 'add'])
    }
    static defaultProps = {
        type: 'contact'
    }

    constructor(props) {
        super(props)
        this.onContactChecked = (e) => this._onContactChecked(e)
        this.handleClickAddContact = (e) => this._handleClickAddContact(e)
    }

    _onContactChecked(e) {
        e.preventDefault()
        this.props.contactChecked(this.props.contact)
    }

    _handleClickAddContact(e) {
        e.preventDefault()
        this.props.addContact()
    }

    render() {
        const styles = require('./CompleteBuyTicketInfo.scss');
        const { contact, checked } = this.props;
        let content = null, insurant = false;
        if (this.props.type === 'contact') {
            content = (
                <div onClick={this.onContactChecked} className={classNames({ [styles.contact]: true, [styles.checkedContact]: checked })}>
                    {insurant && <img className={styles.contactHasSurance} src="/assets/safe_small.png" alt="safe" />}
                    <span className={styles.contactName}>{contact.name}</span>
                    { checked && <span className={styles.contactSelected}><img src="/assets/contacts_selected.png" alt="selected"/></span> }
                </div>
            );
        } else {
            content = (
                <div onClick={this.handleClickAddContact} className={styles.contact}>
                    <div className={styles.addContact}><img src="/assets/plus_red.png" alt="add" /><span>新增</span></div>
                </div>
            );
        }

        return (
            <div className={styles.contactWrap}>
                {content}
            </div>
        );
    }
}

class SingleInfo extends React.Component {
    static propTypes = {
        contact: PropTypes.object.isRequired,
        // deleteCheckedContact: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.handleClick = (e) => this._handleClick(e)
    }

    // _handleClick(e) {
    //     e.preventDefault()
    //     this.props.deleteCheckedContact(this.props.contact)
    // }

    render() {
        const styles = require('./CompleteBuyTicketInfo.scss')
        const { contact } = this.props;
        return (
            <div className={styles.singleInfo}>
                <div className={styles.minus}><img src="/assets/avatar_order.png" alt="minus"/></div>
                <div className={styles.infoContent}>
                    <div className={styles.infoContentWrap}>
                        <span>{contact.name}</span>
                        <span>{`身份证号码 ${contact.identity_card}`}</span>
                    </div>
                </div>
            </div>
        );
    }
}
