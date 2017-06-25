import React from 'react';
import { Checkbox } from 'antd';

export default class Card extends React.Component {
    render() {
        const styles = require('./Card.scss');
        return (
            <div className={styles.card}>
                <div className={styles.totalPrice}>
                    <span>232元</span>
                </div>
                <div className={styles.info}>
                    <div className={styles.cover}>
                        <img src="http://o9vi0jo2t.bkt.clouddn.com/client_uploads/images/178/D9A78555151B824B0E5374671B12D39E" alt="cover" />
                    </div>
                    <div className={styles.description}>
                        <div>
                            <span>Monster Jam 大脚车表演</span>
                        </div>
                        <div>
                            <span>数量</span>
                            <span>20件</span>
                        </div>
                        <div>
                            <span>时间</span>
                            <span>2017年10月02日 4:30</span>
                        </div>
                        <div>
                            <span>单价</span>
                            <span>116元</span>
                        </div>
                    </div>
                </div>
                <div className={styles.tool}>
                    <div>删除</div>
                    <div>
                        <Checkbox style={{ fontSize: '14px' }}>选中</Checkbox>
                    </div>
                </div>
            </div>
        );
    }
}
