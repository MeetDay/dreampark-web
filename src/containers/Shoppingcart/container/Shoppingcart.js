import React from 'react';
import { Card, ShopingTool } from '../component';

export default class extends React.Component {
    render() {
        const styles = require('./Shoppingcart.scss');
        return (
            <div className={styles.shoppingcart}>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <ShopingTool price={232} />
            </div>
        );
    }
}
