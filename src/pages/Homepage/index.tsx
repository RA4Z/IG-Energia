import { memo } from 'react'
import styles from './Homepage.module.scss'
import Carrossel from 'components/Carrossel'
import { BasicRules } from 'utils/basicRules'

function Homepage() {
    BasicRules()
    return (
        <div className={styles.container}>
            <div className={styles.carousel}>
                <Carrossel />
            </div>
        </div>
    )
}
export default memo(Homepage)