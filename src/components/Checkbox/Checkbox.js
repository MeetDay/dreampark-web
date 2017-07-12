import React from 'react'
import PropTypes from 'prop-types'

export default class Checkbox extends React.Component {
    static propTypes = {
        checked: PropTypes.bool,
        defaultChecked: PropTypes.bool,
        value: PropTypes.string,
        checkdImageurl: PropTypes.string,
        onChange: PropTypes.func
    }
    static defaultProps = {
        checked: false,
        defaultChecked: false,
        checkdImageurl: '/assets/checked_cart.png'
    }

    constructor(props) {
        super(props)
        this.handleClick = (e) => this._handleClick(e)
        this.state = {
            checked: props.defaultChecked
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.props.checked) {
            setTimeout(() => { this.setState({ checked: nextProps.checked }) }, 0)
        }
    }

    _handleClick(e) {
        e.preventDefault()
        const { onChange, value } = this.props;
        this.setState((preState, props) => {
            if (typeof this.props.onChange === 'function')
                onChange({ checked: !preState.checked, value  })
            return { checked: !preState.checked }
        })
    }

    render() {
        const styles = require('./Checkbox.scss')
        const style = {
            backgroundColor: this.state.checked ? '#E62A10 ' : 'white',
            border: this.state.checked ? 'none' : '1px solid #ccc'
        }
        return (
            <span className={styles.checkboxWrapper}>
                <span onClick={this.handleClick} style={style} className={styles.checkbox}>
                    <img src={this.props.checkdImageurl} alt="checked" />
                </span>
                <span className={styles.content}>{this.props.value}</span>
            </span>
        );
    }
}
