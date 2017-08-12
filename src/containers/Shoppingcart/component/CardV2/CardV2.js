import React from 'react'
import PropTypes from 'prop-types'
import { convertToLocalDate } from '../../../../utils/dateformat';
import { appendQiNiuQueryParamsForImageUrl } from '../../../../helpers/QiNiuHelpers'

export default class CardV2 extends React.Component {
    static propTypes = {
        goods: PropTypes.object.isRequired,
        deleteGoodsFromShoppingCart: PropTypes.func.isRequired,
        goPayment: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.handleClickDelete = (e) => this._handleClickDelete(e)
        this.handleClickGoPayment = (e) => this._handleClickGoPayment(e)
    }

    _handleClickDelete(e) {
        e.preventDefault()
        this.props.deleteGoodsFromShoppingCart(this.props.goods)
    }

    _handleClickGoPayment(e) {
        e.preventDefault(e)
        this.props.goPayment(this.props.goods)
    }
    render() {
        const styles = require('../Card/Card.scss');
        const { ticket, total: totalPrice, num } = this.props.goods;
        const { price, cover_image: coverImage, ticket_id: ticketID, ticket_name: ticketName } = ticket;
        const startTime = convertToLocalDate(ticket.start_time);
        const endTime = convertToLocalDate(ticket.end_time);
        return (
            <div>
                <div className={styles.card}>
                    <div className={styles.totalPrice}>
                        {/* <span>{totalPrice}</span> */}
                    </div>
                    <div className={styles.info}>
                        <div className={styles.cover}><img src={appendQiNiuQueryParamsForImageUrl(coverImage.name, { w: 160 })} alt="cover" /></div>
                        <div className={styles.description}>
                            <div><span>{ticketName}</span></div>
                            <div><span>数量</span><span>{`${num}件`}</span></div>
                            <div><span>时间</span><span>{`${startTime.date} ${startTime.time}`}</span></div>
                            <div><span>单价</span><span>{price}元</span></div>
                        </div>
                    </div>
                    <div className={styles.tool}>
                        <div onClick={this.handleClickDelete}>删除</div>
                        <div onClick={this.handleClickGoPayment}>付款</div>
                    </div>
                </div>
            </div>
        );
    }
}
