import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class TextElement extends React.Component {
    render() {
        const styles = require('../Element.scss');
        return (
            <div className={classNames(styles.text)}>
                10月4日，在大漠之城阿拉善，结束了为期三天的首届腾格里国际音乐节。首次亮相英雄会就让参会30余万人直面最强音浪，掀起了新一轮电音狂欢！腾格里国际音乐节融合了大量流行电音元素，是汇集了东西方音乐节灵魂与特点的国际范儿音乐节。是汇集了东西方音乐节灵魂与特点的国际范儿音乐节。是汇集了东西方音乐节灵魂与特点的国际范儿音乐节。
            </div>
        );
    }
}
