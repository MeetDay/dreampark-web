import React from 'react';
import PropTypes from 'prop-types';

export default class Phone extends React.Component {
    static propTypes = {
        imgShow: PropTypes.bool,
        onChange: PropTypes.func
    }
    static defaultProps = {
        imgShow: false
    }

    render() {
        const styles = require('./Phone.scss');
        const display = this.props.imgShow ? 'inline-block' : 'none';
        return (
            <div className={styles.phone}>
                <span className={styles.title}>电话号码</span>
                <div className={styles.bottom}>
                    <label className={styles.zone}>+86</label>
                    <input className={styles.inputphone} onChange={this.props.onChange} type="number" />
                    <img style={{ display }} className={styles.checkd} src="/assets/logo.png" alt="checked"/>
                </div>
            </div>
        )
    }
}
