import React from 'react'
import PropTypes from 'prop-types'
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
        const imageUrl = "http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/178/D9A78555151B824B0E5374671B12D39E";
        return (
            <div>
                <div className={styles.card}>
                    <div className={styles.totalPrice}><span>{this.props.goods.total}</span></div>
                    <div className={styles.info}>
                        <div className={styles.cover}>
                            <img src={appendQiNiuQueryParamsForImageUrl(imageUrl, { w: 80 })} alt="cover" />
                        </div>
                        <div className={styles.description}>
                            <div><span>Monster Jam 大脚车表演</span></div>
                            <div><span>数量</span><span>20件</span></div>
                            <div><span>时间</span><span>2017年10月02日 4:30</span></div>
                            <div><span>单价</span><span>116元</span></div>
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
