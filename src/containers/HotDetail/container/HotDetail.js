import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CoverImage } from '../../../components';
import { ToolBar } from '../component';

export default class HotDetail extends React.Component {
    render() {
        const styles = require('./HotDetail.scss');
        const imageUrl = "http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/26/DD76A2DF7CC999FBCDCC9FB28AA4F64E";
        return (
            <div className={styles.detail}>
                <CoverImage height={200} src={imageUrl} />
                <div className={styles.container}>
                    <div>
                        <div className={styles.title}>梦想车展</div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>活动时间</div>
                        <div className={styles.activityTime}>10月1日下午3:30 - 10月1日下午4:30</div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>场馆</div>
                        <div className={styles.activityLocation}>梦想车展中央广场</div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>注意事项</div>
                        <div className={styles.attention}>请勿翻越护栏，文明牌照。未满18岁的儿童需成人陪同参观。</div>
                    </div>
                    <div className={styles.item}>
                        <div className={classNames(styles.tip)}>相关推荐</div>
                    </div>
                </div>
                <ToolBar />
            </div>
        );
    }
}
