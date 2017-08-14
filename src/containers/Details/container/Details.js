import React from 'react'
import PropTypes from 'prop-types'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'

import { isDetailLoaded, getDetailsBy } from '../module/details'
import { CoverImage, TitleElement, PageNotExist } from '../../../components'
import { convertElementsToComponet } from '../../../utils/elements'
import { isEmptyObject } from '../../Login/module/login'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ dispatch, getState }, helpers }) => {
        if (!isDetailLoaded(getState())) {
            return dispatch(getDetailsBy(params.id))
        }
    }
}])

@connect(
    state => ({ detail: state.details.detail })
)

export default class Details extends React.Component {
    render() {
        if (!this.props.detail || isEmptyObject(this.props.detail)) return (<PageNotExist />)
        const styles = require('./Details.scss')
        const { title, cover_image: coverImage, elements } = this.props.detail
        return (
            <div className={styles.details}>
                <div>{ (coverImage && !isEmptyObject(coverImage)) && <CoverImage src={coverImage.name} /> }</div>
                <div className={styles.elements}>
                    { title && <TitleElement title={title} /> }
                    { elements && convertElementsToComponet(elements) }
                </div>
            </div>
        );
    }
}
