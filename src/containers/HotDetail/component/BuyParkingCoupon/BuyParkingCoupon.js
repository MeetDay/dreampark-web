import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class BuyParkingCoupon extends React.Component {
    static propTypes = {
        show: PropTypes.bool,
        onClickCancel: PropTypes.func.isRequired
    }
    static defaultProps = {
        show: false
    }

    constructor(props) {
        super(props)
        this.onCarNumberChange = (e) => this._onCarNumberChange(e)
        this.state = {
            carNumner: '',
            visible: false,
            showBackgroundColor: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            setTimeout(() => { this.setState({ visible: nextProps.show, showBackgroundColor: nextProps.show }) }, 0)
        } else {
            setTimeout(() => { this.setState({ showBackgroundColor: nextProps.show }) }, 500)
            setTimeout(() => { this.setState({ visible: nextProps.show }) }, 600)
        }
    }

    _onCarNumberChange(e) {
        e.preventDefault()
        this.setState({ carNumner: e.target.value })
    }

    render() {
        const buyTicketNowStyle = require('../BuyTicketNow/BuyTicketNow.scss')
        const styles = require('./BuyParkingCoupon.scss')
        const buyTicketCouponStyle = {
            backgroundColor: this.state.showBackgroundColor ? 'rgba(0, 0, 0, .4)' : 'rgba(0, 0, 0, 0)',
            visibility: this.state.visible ? 'visible' : 'hidden'
        }
        const ticketStyle = { bottom: this.props.show ? '0' : '-370px' }

        return (
            <div style={buyTicketCouponStyle} className={classNames(buyTicketNowStyle.backgroundTransition, buyTicketNowStyle.buyTicketNow)}>

                <div style={ticketStyle} className={classNames(buyTicketNowStyle.ticket, buyTicketNowStyle.ticketTransition)}>
                    <div className={buyTicketNowStyle.header}>
                        <span>购买停车券</span>
                        <div onClick={this.props.onClickCancel} className={buyTicketNowStyle.cancel}>
                            <span>取消</span>
                            <img src="/assets/arrow_down_black.png" alt="arrow_down_black" />
                        </div>
                    </div>
                    <div className={styles.description}>说明：梦想盛会停车场采用通票机制，一次购买7天有效，请输入准确的车牌号码以方便您的快速通行。</div>
                    <div className={styles.carnumber}>
                        <div className={styles.carnumberDescription}>车牌号码：</div>
                        <div className={styles.carnumberInput}><input type="text" onChange={this.onCarNumberChange} /></div>
                    </div>
                    <div className={buyTicketNowStyle.toolBar}>
                        <div className={styles.priceInfoContent}>
                            <span>价格</span>
                            <span>450￥</span>
                            <span>立刻购买</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
