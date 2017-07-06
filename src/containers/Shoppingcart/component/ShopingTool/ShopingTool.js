import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '../../../../components';

export default class ShopingTool extends React.Component {
    static propTypes = {
        price: PropTypes.number,
        onClickSettleAccount: PropTypes.func,
        onClickAllChecked: PropTypes.func
    }
    static defaultProps = {
        price: 0
    }

    render () {
        const styles = require('./ShopingTool.scss');
        return (
            <div className={styles.tool}>
                <div onClick={this.props.onClickSettleAccount}>{`￥${this.props.price}`} 结算</div>
                <div><Checkbox onChange={this.props.onClickAllChecked}>全选</Checkbox></div>
            </div>
        );
    }
}
