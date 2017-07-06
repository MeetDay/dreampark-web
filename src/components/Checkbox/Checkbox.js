import React from 'react'
import PropTypes form 'prop-types'

export default class Checkbox extends React.Component {
    static propTypes = {
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        checkdImageurl: PropTypes.string,
        onChange: PropTypes.func
    }
    static defaultProps = {
        checked: false,
        defaultChecked: false,
        checkdImageurl: '/assets/checked_cart.png'
    }

    render() {
        const styles = require('./Checkbox.scss')
        return (
            <span className={styles.checkboxWrapper}>
                <span className={styles.checkbox}>
                    <input type="checkbox" onChange={this.props.onChange} />
                    <img className={styles.checkedImageurl} src={this.props.checkdImageurl} alt="checked" />
                </span>
                <span>{this.props.children}</span>
            </span>
        );
    }
}
