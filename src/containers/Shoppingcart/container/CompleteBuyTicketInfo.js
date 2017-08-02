import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';
import { Modal, message } from 'antd';
import { PageNotExist } from '../../../components'
import { isTicketInfoLoaded, getTicketInfoBy, addContact } from '../module/shoppingcartV2';
import { Phone } from '../../../components';
import { clearWhiteSpaceOf, illegalCardNumber } from '../../../utils/regex';
import { convertToLocalDate } from '../../../utils/dateformat'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ dispatch, getState }, helpers }) => {
        if (!isTicketInfoLoaded(getState())) {
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
        contactList: state.shoppingcart.contactList
    }),
    dispatch => bindActionCreators({ addContact }, dispatch)
)

export default class CompleteBuyTicketInfo extends React.Component {

    static defaultProps = {
        contactList: [{name: '王超', identity_card: 4211278678231}, {identity_card: 4211212331231231231, name: '耿德宁'}, {identity_card: 42112123231231231, name: '徐玉林'}, {identity_card: 4123211231231231231, name: '郭胜利'}, {identity_card: 421129991231, name: '于晨龙'}, {identity_card: 34534523423423423, name: '王超'}],
        insurancePrice: 40
    }

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
            totalPrice: 0,
            checkedContacts: []
        }
    }

    componentDidMount() {
        if (this.props.ticketInfo) {
            setTimeout(_ => {
                this.setState((preState, props) => ({ totalPrice: props.ticketInfo.price + props.insurancePrice, checkedContacts:[props.contactList[0]] }))
            }, 0)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { contact, contactError } = nextProps
        if (contact && contact !== this.props.contact) {
            this.setState({ showAddContact: false })
        } else if (contactError && contactError !== this.props.contactError) {
            message.error(contactError.error_message);
        }
    }

    _handleClickInsurance(e) {
        e.preventDefault()
        console.log('救援服务')
    }

    _handleClickPayment(e) {
        e.preventDefault()
        console.log('支付')
    }

    _contactChecked(checkedContact) {
        const { insurancePrice } = this.props;
        const { price } = this.props.ticketInfo
        if (this.existedContact(this.state.checkedContacts, checkedContact)) {
            if (this.state.checkedContacts.length > 1) {
                const results = this.state.checkedContacts.filter(contact => contact.identity_card !== checkedContact.identity_card)
                this.setState({
                    checkedContacts: [...results],
                    totalPrice: (insurancePrice + price) * results.length,
                })
            }
        } else {
            const checkedContacts = [...this.state.checkedContacts, checkedContact]
            this.setState({
                checkedContacts: checkedContacts,
                totalPrice: (insurancePrice + price) * checkedContacts.length
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
        const styles = require('./CompleteBuyTicketInfo.scss')
        const { ticketInfo } = this.props;
        const ticketStartTimeObject = convertToLocalDate(ticketInfo.start_time)
        const ticketEndTimeObject = convertToLocalDate(ticketInfo.end_time)
        return (
            <div>
                <Helmet><title>补充订单信息</title></Helmet>
                <div className={styles.pageContent}>
                    <div className={styles.ticketInfo}>
                        <span className={styles.ticketImageWrap}><img src="/assets/ticket_border_big.png" alt="ticket"/></span>
                        <div className={styles.ticketDetails}>
                            <div className={styles.ticketDescription}>
                                <div className={styles.ticketDescriptionWrap}>
                                    <span className={styles.ticketTitle}>{ticketInfo.ticket_name}</span>
                                    <span className={styles.ticketTimeInfo}>{`${ticketStartTimeObject.date} ${ticketStartTimeObject.week}`}</span>
                                    <span className={styles.ticketDuration}>{`${ticketStartTimeObject.time}-${ticketEndTimeObject.time}`}</span>
                                </div>
                            </div>
                            <span className={styles.ticketPrice}>￥{ticketInfo.price}</span>
                        </div>
                    </div>
                    <div className={styles.contactList}>
                        <div className={styles.contactListHeader}><span>请选择联系人</span><span>{`已选择: ${this.state.checkedContacts.length}人`}</span></div>
                        <div className={styles.contactListWrap}>
                            {this.props.contactList.map(contact => (<ContactCard key={contact.identity_card} contact={contact} contactChecked={this.contactChecked} checked={this.existedContact(this.state.checkedContacts, contact)} />))}
                            <ContactCard type="add" addContact={this.addContact} />
                        </div>
                    </div>
                    <div className={styles.checkedContactInfo}>
                        {this.state.checkedContacts.map(checkedContact => (<SingleInfo key={checkedContact.identity_card} contact={checkedContact} deleteCheckedContact={this.contactChecked} />))}
                    </div>
                    <div className={styles.insuranceService}>
                        <div className={styles.insuranceServiceWrap}>
                            <span className={styles.imageWrap}><img className={styles.imgsafe} src="/assets/safe.png" alt="safe"/></span>
                            <span className={styles.insuranceText}>{`救援服务保险 ￥${this.props.insurancePrice}×${this.state.checkedContacts.length}`}</span>
                            <span onClick={this.handleClickInsurance} className={styles.imageWrap}><img className={styles.goDetailArrow} src="/assets/go_detail_gray.png" alt="goDetail"/></span>
                        </div>
                    </div>
                </div>
                <div className={styles.toolbar}>
                    <div className={styles.price}><span>价格</span><span>￥{this.state.totalPrice}</span></div>
                    <div onClick={this.handleClickPayment} className={styles.nextStep}><span>支付</span></div>
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
        deleteCheckedContact: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.handleClick = (e) => this._handleClick(e)
    }

    _handleClick(e) {
        e.preventDefault()
        this.props.deleteCheckedContact(this.props.contact)
    }

    render() {
        const styles = require('./CompleteBuyTicketInfo.scss')
        const { contact } = this.props;
        return (
            <div className={styles.singleInfo}>
                <div onClick={this.handleClick} className={styles.minus}><img src="/assets/minus_red.png" alt="minus"/></div>
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
