import React from 'react'
import PropTypes from 'prop-types'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { isEmptyObject } from '../../Login/module/login'
import { PageNotExist, CoverImage, TitleElement, TextElement, ImageElement, BigImageElement } from '../../../components'
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
        term: state.dreamparkTerms.term
    })
)

export default class TermsOfService extends React.Component {

    convertElementToComponet() {
        return (element) => {
            const { id, content } = element
            let mappedElement = null
            if (content.type === 'text') {
                mappedElement = <TextElement key={id} text={content.media.plain_text} />
            } else if (content.type === 'image' && content.media.caption && content.media.caption.length > 0) {
                mappedElement = <BigImageElement key={id} src={content.media.name} captionText={content.media.caption} />
            } else if (content.type === 'image') {
                mappedElement = <ImageElement key={id} src={content.media.name} />
            }
            return mappedElement
        }
    }

    render() {
        if (!this.props.term || isEmptyObject(this.props.term)) return (<PageNotExist />);
        const styles = require('./TermsOfService.scss')
        const { title, cover_image: coverImage, elements } = this.props.term;
        return (
            <div className={styles.container}>
                { !isEmptyObject(coverImage) && <CoverImage src={coverImage.name} /> }
                <div className={styles.termsWrapper}>
                    { title && <TitleElement title={title} /> }
                    { elements && elements.map(this.convertElementToComponet())}
                </div>
            </div>
        );
    }
}
