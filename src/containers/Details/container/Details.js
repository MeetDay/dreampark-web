import React from 'react'
import PropTypes from 'prop-types'
import { CoverImage, TitleElement, TextElement, BigImageElement,ImageElement } from '../../../components'

export default class Details extends React.Component {
    render() {
        const styles = require('./Details.scss')
        const imageUrl = "http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/26/DD76A2DF7CC999FBCDCC9FB28AA4F64E";
        return (
            <div className={styles.details}>
                <div className={styles.asd}>
                    <CoverImage src={imageUrl} />
                </div>
                <div className={styles.elements}>
                    <TitleElement />
                    <BigImageElement />
                    <TextElement />
                    <BigImageElement />
                    <TextElement />
                    <ImageElement />
                    <TextElement />
                </div>
            </div>
        );
    }
}
