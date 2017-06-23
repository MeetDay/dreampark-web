import React from 'react';

export default class Navbar extends React.Component {
    render() {
        const styles = require('./Navbar.scss');
        return (
            <div className={styles.nav}>
                Navbar
            </div>
        );
    }
}
