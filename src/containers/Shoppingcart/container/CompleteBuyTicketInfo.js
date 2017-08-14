import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { Modal, message } from 'antd';
import { PageNotExist } from '../../../components'
import { isTicketInfoLoaded, getTicketInfoBy, addContact, isTicketOrderInfoLoaded, getTicketOrderInfoBy, payment, submitTicketOrder } from '../module/shoppingcartV2';
import { Phone } from '../../../components';
import { clearWhiteSpaceOf, illegalCardNumber } from '../../../utils/regex';
import { convertToLocalDate } from '../../../utils/dateformat'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ dispatch, getState }, helpers }) => {
        if (params.type === 'ticketorder' && !isTicketOrderInfoLoaded(getState())) {
            return dispatch(getTicketOrderInfoBy(params.id))
        } else if (!isTicketInfoLoaded(getState())) {
            return dispatch(getTicketInfoBy(params.id))
        }
    }
}])

@connect(
    state => ({
        contactLoading: state.shoppingcart.contactLoading,
        contactError: state.shoppingcart.contactError,
        contact: state.shoppingcart.contact,
        ticketInfo: state.shoppingcart.ticketInfo,
        contactList: state.shoppingcart.contactList,
        checkedContactsNoInsurance: state.shoppingcart.checkedContactsNoInsurance,

        isTicketOrderInfo: state.shoppingcart.isTicketOrderInfo,
        hasInsurance: state.shoppingcart.ticketInfo ? state.shoppingcart.ticketInfo.is_insurance === 1 : false,
        insurancePrice: state.shoppingcart.ticketInfo ? state.shoppingcart.ticketInfo.insurance_price || 0 : 0,

        generatorTicketOrderLoading: state.shoppingcart.generatorTicketOrderLoading,
        generatorTicketOrder: state.shoppingcart.generatorTicketOrder,
        generatorTicketOrderError: state.shoppingcart.generatorTicketOrderError,

        paymentLoading: state.shoppingcart.paymentLoading,
        paymentObject: state.shoppingcart.paymentObject,
        paymentError: state.shoppingcart.paymentError
    }),
    dispatch => bindActionCreators({ push, addContact, payment, submitTicketOrder }, dispatch)
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
        this.state = {
            showAddContact: false,
            username: '',
            idCardNo: '',
            checkedContacts: props.ticketInfo ? (props.isTicketOrderInfo ? [...props.contactList] : ((props.contactList && props.contactList.length > 0) ? [props.contactList[0]] : [])) : [],
            checkedContactsNoInsurance: props.checkedContactsNoInsurance,
            totalPrice: props.ticketInfo ? (props.isTicketOrderInfo ? Number(props.ticketInfo.amount).toFixed(2) : Number(props.ticketInfo.price + props.insurancePrice*props.checkedContactsNoInsurance.length).toFixed(2)) : 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        // 添加联系人
        const { contact, contactError } = nextProps
        if (contact && contact !== this.props.contact) {
            this.setState({ showAddContact: false })
        } else if (contactError && contactError !== this.props.contactError) {
            message.error(contactError.error_message);
        }

        const { paymentObject, paymentError, generatorTicketOrder, generatorTicketOrderError } = nextProps
        // 提交订单并支付
        if (generatorTicketOrder && generatorTicketOrder !== this.props.generatorTicketOrder) {
            message.success('购票成功！')
            this.props.push('/tickets')
        } else if (generatorTicketOrderError && generatorTicketOrderError !== this.props.generatorTicketOrderError) {
            if (generatorTicketOrderError.code == 10204) {
                message.error('支付已成功，出票失败，您所支付的款项将原路退回')
            }
            this.props.push('/tickets?type=unpaid')
        }
        // 订单详情页支付
        if (paymentObject && paymentObject !== this.props.paymentObject) {
            message.success('购票成功！')
            this.props.push('/tickets')
        } else if (paymentError && paymentError !== this.props.paymentError) {
            if (generatorTicketOrderError.code == 10204) {
                message.error('支付已成功，出票失败，您所支付的款项将原路退回');
                this.props.push('/tickets?type=unpaid');
            } else {
                message.info('支付失败，请重新尝试...')
            }
        }
    }

    _handleClickPayment(e) {
        e.preventDefault()
        if (this.props.isTicketOrderInfo) {
            if (!this.props.paymentLoading) {
                this.props.payment({
                    id: this.props.ticketInfo.orders_id,
                    amount: this.state.totalPrice
                })
            }
        } else {
            if (!this.props.generatorTicketOrderLoading) {
                this.props.submitTicketOrder({
                    amount: this.state.totalPrice,
                    ticket: {
                        id: this.props.ticketInfo.id,
                        contacters: this.state.checkedContacts.map(contact => contact.id)
                    }
                });
            }
        }
    }

    _contactChecked(checkedContact) {
        const { insurancePrice } = this.props;
        const { price } = this.props.ticketInfo
        if (this.existedContact(this.state.checkedContacts, checkedContact)) {
            if (this.state.checkedContacts.length > 1) {
                const results = this.state.checkedContacts.filter(contact => contact.identity_card !== checkedContact.identity_card);
                const noInsuranceContacts = results.filter(contact => contact.insurant == 'no');
                this.setState({
                    checkedContacts: [...results],
                    checkedContactsNoInsurance: [...noInsuranceContacts],
                    totalPrice: Number(price*results.length + insurancePrice*noInsuranceContacts.length).toFixed(2),
                })
            }
        } else {
            const checkedContacts = [...this.state.checkedContacts, checkedContact];
            const noInsuranceContacts = checkedContacts.filter(contact => contact.insurant == 'no');
            this.setState({
                checkedContacts: checkedContacts,
                checkedContactsNoInsurance: [...noInsuranceContacts],
                totalPrice: Number(price*checkedContacts.length + insurancePrice*noInsuranceContacts.length).toFixed(2)
            })
        }
    }

    // 控制显示隐藏添加常用联系人的弹窗
    _addContact() {
        this.setState({ showAddContact: true })
    }
    _handleClickCancel(e) {
        e.preventDefault()
        this.setState({ showAddContact: false })
    }

    // 添加常用联系人
    _onUsernameChange(e) {
        e.preventDefault()
        this.setState({ username: e.target.value })
    }
    _onCardNumberChange(e) {
        e.preventDefault()
        this.setState({ idCardNo: e.target.value })
    }

    _handleClickFinished(e) {
        e.preventDefault()
        const username = clearWhiteSpaceOf(this.state.username)
        const idCardNo = clearWhiteSpaceOf(this.state.idCardNo)
        if (username.length > 0 && illegalCardNumber(idCardNo)) {
            this.props.addContact({ name: clearWhiteSpaceOf(this.state.username), cardno: clearWhiteSpaceOf(this.state.idCardNo) })
        } else {
            message.warning('请输入正确的姓名和身份证号码...')
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
                                <div className={styles.ticketDescriptionWrap}>
                                    <span className={styles.ticketTitle}>{ticketInfo.ticket_name}</span>
                                    <span className={styles.ticketTimeInfo}>{`${ticketStartTimeObject.date} ${ticketStartTimeObject.week}`}</span>
                                    <span className={styles.ticketDuration}>{`${ticketStartTimeObject.time} - ${ticketEndTimeObject.time}`}</span>
                                </div>
                            </div>
                            <span className={styles.ticketPrice}>￥{ticketInfo.price}</span>
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
                    {this.props.hasInsurance &&
                        <div className={styles.insuranceService}>
                            <div className={styles.insuranceServiceWrap}>
                                <span className={styles.imageWrap}><img className={styles.imgsafe} src="/assets/safe.png" alt="safe"/></span>
                                <span className={styles.insuranceText}>{`救援服务保险 ￥${this.props.insurancePrice}×${this.state.checkedContactsNoInsurance.length}`}</span>
                                <span className={styles.imageWrap}>
                                    <a href={this.props.ticketInfo.insurance_link}><img className={styles.goDetailArrow} src="/assets/go_detail_gray.png" alt="goDetail"/></a>
                                </span>
                            </div>
                        </div>
                    }
                    {!this.props.isTicketOrderInfo && <div className={styles.insuranceAttention}><span>注意：联系人左上角的“盾牌”代表该联系人已购买救援服务，无需再次购买！</span></div>}
                </div>
                <div className={styles.toolbar}>
                    <div className={styles.price}><span>价格</span><span>￥{this.state.totalPrice}</span></div>
                    <div onClick={this.handleClickPayment} className={styles.nextStep}><span>去支付</span></div>
                </div>
                {this.state.showAddContact &&
                    <Modal visible={this.state.showAddContact} title={<div className={styles.addContactTitle}>新增联系人</div>} footer={null} onCancel={this.handleClickCancel}>
                        <div className={styles.addContactContent}>
                            <div className={styles.addContactAttention}>
                                <span>注意</span>
                                <span>系统将验证身份证号码与姓名是否匹配，根据活动要求及保险政策必须使用真实的身份信息，否则造成的相关责任由使用者自行承担。</span>
                            </div>
                            <div className={styles.addContactInteraction}>
                                <Phone type="text" theme="dark" usedFor="other" title="您的真实姓名" zone={false} value={this.state.username} onChange={this.onUsernameChange} />
                                <Phone type="tel" theme="dark" usedFor="idcard" title="身份证号码" zone={false} value={this.state.idCardNo} onChange={this.onCardNumberChange} />
                                <button disabled={this.props.contactLoading} onClick={this.handleClickFinished} className={styles.finishedButton}>完成</button>
                            </div>
                        </div>
                    </Modal>
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
        let content = null
        if (this.props.type === 'contact') {
            content = (
                <div onClick={this.onContactChecked} className={classNames({ [styles.contact]: true, [styles.checkedContact]: checked })}>
                    {this.props.contact.insurant == 'yes' && <img className={styles.contactHasSurance} src="/assets/safe_small.png" alt="safe" />}
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
