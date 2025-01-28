import styles from './NotFound.module.scss';
import { ReactComponent as NotFoundImage } from 'assets/not_found.svg';
import classNames from 'classnames';
import { memo } from 'react';
import { BasicRules } from 'utils/basicRules';

export function NotFound() {
    BasicRules()
    return (
        <div className={classNames({
            [styles.container]: true
        })}>
            <NotFoundImage className={styles.image} />
            <h2>Página não encontrada!</h2>
        </div>
    );
}
export default memo(NotFound)