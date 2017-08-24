import React from 'react'
import PropTypes from 'prop-types'

export default class LoadMoreButton extends React.Component {
    static propTypes = {
        hasMore: PropTypes.bool,
        isActive: PropTypes.bool,
        activeDescriptionText: PropTypes.string,
        normalDescriptionText: PropTypes.string,
        noMoreDescriptionText: PropTypes.string,
        onClick: PropTypes.func,
        type: PropTypes.oneOf(['circle', 'ballspin','linespinfade']),
    }
    static defaultProps = {
        type: 'circle',
        hasMore: true,
        isActive: false,
        activeDescriptionText: '正在加载...',
        normalDescriptionText: '点击加载更多...',
        noMoreDescriptionText: '没有更多了...'
    }

    constructor(props) {
        super(props)
        this.state = {
            rotateDegree: 0,
            clockID: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isActive } = nextProps
        if (isActive) {
            const clockID = setInterval(_ => {
                this.setState((preState) => ({ rotateDegree: (preState.rotateDegree + 1) % 360 }))
            }, 1000 / 360)
            this.setState({ clockID: clockID })
        } else {
            clearInterval(this.state.clockID)
        }
    }

    render() {
        const styles = require('./LoadMoreButton.scss')
        const { hasMore, isActive, activeDescriptionText, normalDescriptionText, noMoreDescriptionText } = this.props
        const nonActiveDescriptionText = hasMore ? normalDescriptionText : noMoreDescriptionText
        const descriptionText = isActive ? activeDescriptionText : nonActiveDescriptionText
        const imageStyle = { transform: 'rotate(' + this.state.rotateDegree + 'deg)' };
        const buttonStyle = { display: hasMore ? 'block' : 'none' };
        return (
            <div style={buttonStyle} className={styles.loading}>
                <div className={styles.loadingWrap} onClick={this.props.onClick}>
                    <img style={imageStyle} className={styles.loadingImage} src={`/loading/${this.props.type}.png`} alt="loading" />
                    <span className={styles.loadingText}>{descriptionText}</span>
                </div>
            </div>
        );
    }
}
