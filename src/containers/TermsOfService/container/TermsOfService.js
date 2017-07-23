import React from 'react'
import PropTypes from 'prop-types'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { CoverImage, TitleElement, TextElement, ImageElement, BigImageElement } from '../../../components'
import { isTermLoaded, getUserTermsBy } from '../module/dreamparkTerms'

@asyncConnect([{
    deferred: true,
    promise: ({ params, store:{ dispatch, getState } }) => {
        const { serviceType } = params;
        if (!isTermLoaded(getState())) {
            return dispatch(getUserTermsBy(serviceType))
        }
    }
}])

@connect(
    state => ({
        title: state.dreamparkTerms.title,
        coverImage: state.dreamparkTerms.coverImage,
        elements: state.dreamparkTerms.elements
    })
)

export default class TermsOfService extends React.Component {

    convertElementToComponet() {
        return (element) => {
            const { id, content } = element
            let mappedElement = null
            if (content.type === 'text') {
                mappedElement = <TextElement key={id} text={content.media.plain_text} />
            } else if (content.type === 'image' && content.media.caption.length > 0) {
                mappedElement = <BigImageElement key={id} src={content.media.name} captionText={content.media.caption} />
            } else if (content.type === 'image') {
                mappedElement = <ImageElement key={id} src={content.media.name} />
            }
            return mappedElement
        }
    }

    render() {
        const styles = require('./TermsOfService.scss')
        return (
            <div className={styles.container}>
                { this.props.coverImage && <CoverImage src={this.props.coverImage.name} /> }
                { this.props.title && <TitleElement title={this.props.title} textAlign="center" /> }
                { this.props.elements.map(this.convertElementToComponet())}
            </div>
        );
    }
}
