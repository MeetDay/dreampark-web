import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

export default class ShopingTool extends React.Component {
    static propTypes = {
        price: PropTypes.number
    }
    static defaultProps = {
        price: 0
    }

    render () {
        const styles = require('./ShopingTool.scss');
        return (
            <div className={styles.tool}>
                <div>{`￥${this.props.price}`} 结算</div>
                <div>
                    <Checkbox style={{ fontSize: '16px' }}>全选</Checkbox>
                </div>
            </div>
        );
    }
}
