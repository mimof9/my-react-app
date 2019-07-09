import React, { Component } from 'react'
import styles from './index.css'    // 要注意 别名补全先补全的js- - 这我就很尴尬了
import user8k from '../../../images/user8k.jpg'
import user4k from '../../../images/user4k.jpg'

class Page1 extends Component {
    render() {
        return (
            <div>
                <h2 className={styles.header}>Page1</h2>
                <img src={user4k} alt="头像4k大小"/>
                <img src={user8k} alt="头像8k大小"/>
            </div>
        )
    }
}

export default Page1
