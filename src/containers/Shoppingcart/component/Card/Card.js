import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '../../../../components'

export default class Card extends React.Component {
    static propTypes = {
        goods: PropTypes.object.isRequired,
        checkedItem: PropTypes.func,
        uncheckedItem: PropTypes.func,
        deleteGoodsFromShoppingCart: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.onChange = (checkedItem) => this._onChange(checkedItem)
        this.handleClickDelete = (e) => this._handleClickDelete(e)
    }

    // click checkbox event callback
    _onChange(checkedItem) {
        const { goods } = this.props
        if (checkedItem.checked) {
            this.props.checkedItem(goods)
        } else {
            this.props.uncheckedItem(goods)
        }
    }

    _handleClickDelete(e) {
        e.preventDefault()
        this.props.deleteGoodsFromShoppingCart(this.props.goods)
    }

    render() {
        const styles = require('./Card.scss');
        const { checked } = this.props.goods;
        return (
            <div className={styles.card}>
                <div className={styles.totalPrice}><span>{this.props.goods.total}</span></div>
                <div className={styles.info}>
                    <div className={styles.cover}>
                        <img src="http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/178/D9A78555151B824B0E5374671B12D39E" alt="cover" />
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
                    <div><Checkbox checked={checked} value="选中" onChange={this.onChange} /></div>
                </div>
            </div>
        );
    }
}
