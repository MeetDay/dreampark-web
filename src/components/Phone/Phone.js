import React from 'react';
import PropTypes from 'prop-types';

export default class Phone extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        zone: PropTypes.bool,
        value: PropTypes.string,
        // defaultValue: PropTypes.string,
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
        const marginLeft = this.props.zone ? '20px' : '2px';
        const maxWidth = this.props.zone ? '190px' : '240px';
        return (
            <div className={styles.phone}>
                <span className={styles.title}>{this.props.title}</span>
                <div className={styles.bottom}>
                    {this.props.zone && <label className={styles.zone}>+86</label>}
                    <input id="phonenumber" style={{ marginLeft, maxWidth }} className={styles.inputphone} onChange={this.props.onChange} type={this.props.type} value={this.props.value} />
                    <img style={{ display }} className={styles.checkd} src="/assets/checked_cart.png" alt="checked"/>
                </div>
            </div>
        )
    }
}
