import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '../../../../components';

export default class ShopingTool extends React.Component {
    static propTypes = {
        allChecked: PropTypes.bool,
        price: PropTypes.number,
        onClickSettleAccount: PropTypes.func,
        onClickAllChecked: PropTypes.func
    }

    render () {
        const styles = require('./ShopingTool.scss');
        return (
            <div className={styles.tool}>
                <div onClick={this.props.onClickSettleAccount}>{`￥${this.props.price}`} 结算</div>
                <div><Checkbox checked={this.props.allChecked} value="全选" onChange={this.props.onClickAllChecked} /></div>
            </div>
        );
    }
}
