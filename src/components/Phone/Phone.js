import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { appendWhiteSpaceOnMatchCharacter } from '../../utils/regex'

export default class Phone extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        zone: PropTypes.bool,
        value: PropTypes.string,
        // defaultValue: PropTypes.string,
        imgShow: PropTypes.bool,
        onChange: PropTypes.func,
        theme: PropTypes.oneOf(['white', 'dark']),
        usedFor: PropTypes.oneOf(['phone', 'idcard', 'other'])
    }
    static defaultProps = {
        type: 'tel',
        usedFor: 'phone',
        theme: 'white',
        title: '电话号码',
        zone: true,
        imgShow: false,
    }

    render() {
        const styles = require('./Phone.scss');
        const { imgShow, value, type, zone, usedFor, theme } = this.props;
        const display = imgShow ? 'inline-block' : 'none';
        const marginLeft = zone ? '20px' : '2px';
        const maxWidth = zone ? '190px' : '240px';
        const fontSize = usedFor === 'idcard' ? '20px' : '24px';
        let formatValue = value
        // phonenumber
        if (usedFor === 'phone') {
            formatValue = appendWhiteSpaceOnMatchCharacter(value);
        } else if (usedFor === 'idcard') {
            formatValue = appendWhiteSpaceOnMatchCharacter(value, false);
        }
        const isDark = theme === 'dark';
        return (
            <div className={classNames([styles.phone]: true, [styles.phoneDarkTheme]: isDark)}>
                <span className={styles.title}>{this.props.title}</span>
                <div className={styles.bottom}>
                    {this.props.zone && <label className={styles.zone}>+86</label>}
                    <input id="phonenumber" style={{ fontSize, marginLeft, maxWidth, width: maxWidth }} className={styles.inputphone} onChange={this.props.onChange} type={this.props.type} value={formatValue} />
                    <img style={{ display }} className={styles.checkd} src="/assets/checked_cart.png" alt="checked"/>
                </div>
            </div>
        )
    }
}
