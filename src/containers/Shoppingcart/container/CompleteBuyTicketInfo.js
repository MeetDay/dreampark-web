import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Modal } from 'antd'
import { Phone } from '../../../components'

export default class CompleteBuyTicketInfo extends React.Component {

    static defaultProps = {
        contactList: [{id: 1, name: '王超'}, {id: 2, name: '耿德宁'}, {id: 3, name: '徐玉林'}, {id: 4, name: '郭胜利'}, {id: 6, name: '于晨龙'}, {id: 7, name: '王超'}]
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
            checkedContacts: []
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
        console.log(checkedContact)
        if (this.existedContact(this.state.checkedContacts, checkedContact)) {
            const results = this.state.checkedContacts.filter(contact => contact.id !== checkedContact.id)
            this.setState({ checkedContacts: [...results] })
        } else {
            this.setState({ checkedContacts: [...this.state.checkedContacts, checkedContact] })
        }
    }

    _addContact() {
        this.setState({ showAddContact: true })
    }
    _handleClickCancel(e) {
        e.preventDefault()
        this.setState({ showAddContact: false })
    }

    _onUsernameChange(e) {
        e.preventDefault()
        console.log(e.target.value)
        this.setState({ username: e.target.value })
    }
    _onCardNumberChange(e) {
        e.preventDefault()
        console.log(e.target.value)
        this.setState({ idCardNo: e.target.value })
    }

    _handleClickFinished(e) {
        e.preventDefault()
        console.log('完成')
    }

    existedContact(checkedContacts, checkedContact) {
        let existed = false;
        if (checkedContacts && Array.isArray(checkedContacts) && checkedContacts.length > 0) {
            const result = checkedContacts.find(contact => contact.id === checkedContact.id)
            if (result) existed = true
        }
        return existed
    }

    render() {
        const styles = require('./CompleteBuyTicketInfo.scss')
        return (
            <div>
                <div className={styles.nav}>
                    <span className={styles.navTitle}>补充订单信息</span>
                </div>
                <div className={styles.pageContent}>
                    <div className={styles.ticketInfo}>
                        <span className={styles.ticketImageWrap}><img src="/assets/ticket_border_big.png" alt="ticket"/></span>
                        <div className={styles.ticketDetails}>
                            <div className={styles.ticketDescription}>
                                <div className={styles.ticketDescriptionWrap}>
                                    <span className={styles.ticketTitle}>腾格里国际音乐节</span>
                                    <span className={styles.ticketTimeInfo}>2017年10月2日 星期三</span>
                                    <span className={styles.ticketDuration}>8:00-9:00</span>
                                </div>
                            </div>
                            <span className={styles.ticketPrice}>￥680</span>
                        </div>
                    </div>
                    <div className={styles.contactList}>
                        <div className={styles.contactListHeader}><span>请选择联系人</span><span>{`已选择: ${this.state.checkedContacts.length}人`}</span></div>
                        <div className={styles.contactListWrap}>
                            {this.props.contactList.map(contact => (<ContactCard key={contact.id} contact={contact} contactChecked={this.contactChecked} checked={this.existedContact(this.state.checkedContacts, contact)} />))}
                            <ContactCard type="add" addContact={this.addContact} />
                        </div>
                    </div>
                    <div className={styles.checkedContactInfo}>
                        {this.state.checkedContacts.map(checkedContact => (<SingleInfo key={checkedContact.id} contact={checkedContact} deleteCheckedContact={this.contactChecked} />))}
                    </div>
                    <div className={styles.insuranceService}>
                        <div className={styles.insuranceServiceWrap}>
                            <span className={styles.imageWrap}><img className={styles.imgsafe} src="/assets/safe.png" alt="safe"/></span>
                            <span className={styles.insuranceText}>{`救援服务保险 ￥40×${this.state.checkedContacts.length}`}</span>
                            <span onClick={this.handleClickInsurance} className={styles.imageWrap}><img className={styles.goDetailArrow} src="/assets/go_detail_gray.png" alt="goDetail"/></span>
                        </div>
                    </div>
                </div>
                <div className={styles.toolbar}>
                    <div className={styles.price}><span>价格</span><span>1440￥</span></div>
                    <div onClick={this.handleClickPayment} className={styles.nextStep}><span>支付</span></div>
                </div>
                {this.state.showAddContact &&
                    <Modal
                        visible={this.state.showAddContact}
                        title={<div className={styles.addContactTitle}>新增联系人</div>}
                        footer={null}
                        onCancel={this.handleClickCancel}
                    >
                        <div className={styles.addContactContent}>
                            <div className={styles.addContactAttention}>
                                <span>注意</span>
                                <span>系统将验证身份证号码与姓名是否匹配，根据活动要求及保险政策必须使用真实的身份信息，否则造成的相关责任由使用者自行承担。</span>
                            </div>
                            <div className={styles.addContactInteraction}>
                                <Phone type="text" theme="dark" usedFor="other" title="您的真实姓名" zone={false} value={this.state.username} onChange={this.onUsernameChange} />
                                <Phone type="tel" theme="dark" usedFor="idcard" title="身份证号码" zone={false} value={this.state.idCardNo} onChange={this.onCardNumberChange} />
                                <div onClick={this.handleClickFinished} className={styles.finishedButton}>完成</div>
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
        type: PropTypes.oneOf(['contact', 'add']),
        checked: PropTypes.bool,
        contact: PropTypes.object,
        contactChecked: PropTypes.func,
        addContact: PropTypes.func
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
                        <span>{`身份证号码 42108319900376380`}</span>
                    </div>
                </div>
            </div>
        );
    }
}
