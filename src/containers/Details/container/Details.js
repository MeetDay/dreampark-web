import React from 'react'
import PropTypes from 'prop-types'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'

import { isDetailLoaded, getDetailsBy } from '../module/details'
import { CoverImage, TitleElement } from '../../../components'
import { convertElementsToComponet } from '../../../utils/elements'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ dispatch, getState }, helpers }) => {
        if (!isDetailLoaded(getState())) {
            return dispatch(getDetailsBy(params.id))
        }
    }
}])

@connect(
    state => ({
        detail: state.details.detail
    })
)

export default class Details extends React.Component {
    render() {
        if (!this.props.detail) return null
        const styles = require('./Details.scss')
        const { title, cover_image: coverImage, elements } = this.props.detail
        return (
            <div className={styles.details}>
                <div className={styles.asd}>
                    { coverImage && <CoverImage src={coverImage.name} /> }
                </div>
                <div className={styles.elements}>
                    { title && <TitleElement title={title} /> }
                    { elements && convertElementsToComponet(elements) }
                </div>
            </div>
        );
    }
}
