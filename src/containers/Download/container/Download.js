import React from 'react';
import PropTypes from 'prop-types';

export default class Download extends React.Component {

    render() {
        const styles = require('./Download.scss');
        const backgroundStyle = { backgroundImage: `url("/download/download-background.png")` }
        return (
            <div>
                <div style={backgroundStyle} className={styles.background}>
                    <div className={styles.fbparkLogo}><img src="/download/fbpark-logo.png" alt="fbpark"/></div>
                    <div className={styles.fbparkDescription}><span>2017 专属你的极致体验<br />尽在阿拉善梦想公园</span></div>
                    <div className={styles.fbparkDownload}>
                        <a className={styles.downloadLink} href="">
                            <div className={styles.downloadWrapper}>
                                <img src="/download/apple-icon.png" alt="apple" />
                                <span>App Store下载</span>
                            </div>
                        </a>
                        <a className={styles.downloadLink} href="">
                            <div className={styles.downloadWrapper}>
                                <img src="/download/android-icon.png" alt="android" />
                                <span>Android版下载</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
