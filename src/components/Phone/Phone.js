import React from 'react';
import PropTypes from 'prop-types';

export default class Phone extends React.Component {
    static propTypes = {
        onChange: PropTypes.func
    }

    render() {
        const styles = require('./Phone.scss');
        return (
            <div className={styles.phone}>
                <span className={styles.title}>电话号码</span>
                <div className={styles.bottom}>
                    <label className={styles.zone}>+86</label>
                    <input className={styles.inputphone} onChange={this.props.onChange} type="number" />
                    <img className={styles.checkd} src="/assets/logo.png" alt="checked"/>
                </div>
            </div>
        )
    }
}
