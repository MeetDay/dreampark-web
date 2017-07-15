import React from 'react'
import PropTypes from 'prop-types'

export default class LoadMoreButton extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
        onClick: PropTypes.func
    }

    render() {
        return (
            <div>
                Load More Button
            </div>
        );
    }
}
