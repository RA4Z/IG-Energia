import { memo } from 'react'
import styles from './Homepage.module.scss'
import Carrossel from 'components/Carrossel'

function Homepage() {
    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <Carrossel />
            </div>
        </div>
    )
}
export default memo(Homepage)