import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class CompleteBuyTicketInfo extends React.Component {

    static defaultProps = {
        contactList: [{id: 1, name: '王超'}, {id: 2, name: '耿德宁'}, {id: 3, name: '徐玉林'}, {id: 4, name: '郭胜利'}, {id: 6, name: '于晨龙'}, {id: 7, name: '王超'}]
    }

    constructor(props) {
        super(props)
        this.contactChecked = (checkedContact) => this._contactChecked(checkedContact)
        this.addContact = () => this._addContact()
        this.state = {
            checkedContacts: []
        }
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
        console.log('添加联系人...')
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
                    <div>
                        票信息
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
                </div>
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

    render() {
        const styles = require('./CompleteBuyTicketInfo.scss')
        const { contact } = this.props;
        return (
            <div className={styles.singleInfo}>
                <div className={styles.minus}><img src="/assets/minus_red.png" alt="minus"/></div>
                <div className={styles.infoContent}>
                    <div className={styles.infoContentWrap}>
                        <span>{contact.name}</span>
                        <span>42108319900376380</span>
                    </div>
                </div>
            </div>
        );
    }
}
