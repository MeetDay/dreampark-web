import React from 'react'
import PropTypes from 'prop-types'
import { asyncConnect } from 'redux-async-connect'
import { connect } from 'react-redux'
import { TitleElement, TextElement } from '../../../components'
import { getUserAgreement, getPrivicyPolicy, getAdmissionNotice } from '../module/terms'

// @asyncConnect([{
//     deferred: true,
//     promise: ({ params, store:{ dispatch } }) => {
//         const { serviceType } = params;
//         if (serviceType === 'agreement') return dispatch(getUserAgreement())
//         if (serviceType === 'privacy') return dispatch(getPrivicyPolicy())
//         if (serviceType === 'notice') return dispatch(getAdmissionNotice())
//     }
// }])

@connect(
    state => ({ term: state.terms.term })
)

export default class TermsOfService extends React.Component {
    render() {
        const styles = require('./TermsOfService.scss')
        return (
            <div className={styles.container}>
                <TitleElement />
                <TextElement />
                <TextElement />
                <TextElement />
                <TextElement />
                <TextElement />
            </div>
        );
    }
}
