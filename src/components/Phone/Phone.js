import React from 'react';
import PropTypes from 'prop-types';

export default class Phone extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        zone: PropTypes.bool,
        defaultValue: PropTypes.string,
        imgShow: PropTypes.bool,
        onChange: PropTypes.func
    }
    static defaultProps = {
        type: 'number',
        title: '电话号码',
        zone: true,
        imgShow: false,
    }

    render() {
        const styles = require('./Phone.scss');
        const display = this.props.imgShow ? 'inline-block' : 'none';
        const marginLeft = this.props.zone ? '20px' : '0';
        return (
            <div className={styles.phone}>
                <span className={styles.title}>{this.props.title}</span>
                <div className={styles.bottom}>
                    {this.props.zone && <label className={styles.zone}>+86</label>}
                    <input id="phonenumber" style={{ marginLeft }} className={styles.inputphone} onChange={this.props.onChange} type={this.props.type} defaultValue={this.props.defaultValue} />
                    <img style={{ display }} className={styles.checkd} src="/assets/checked_cart.png" alt="checked"/>
                </div>
            </div>
        )
    }
}
