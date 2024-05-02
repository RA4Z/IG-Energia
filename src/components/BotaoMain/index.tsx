import styles from './BotaoMain.module.scss'

interface Props {
    text: string
    onClick: any
}

export default function BotaoMain(props:Props) {
    return (
        <button className={styles.button} onClick={() => props.onClick()}>
            <span className={styles.btn_txt}>{props.text}</span>
        </button>
    )
}