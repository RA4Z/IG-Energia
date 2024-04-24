import 'font-awesome/css/font-awesome.min.css';
import styles from './Social.module.scss'
import { phoneNumber } from 'types/database';

export default function Social() {
    return (
        <div className={styles.effect__aeneas}>
            <div className={styles.buttons}>
                <a href="https://www.facebook.com" className={styles.fb} title="Nosso Facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="https://twitter.com" className={styles.tw} title="Nosso Twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href={`https://wa.me/${phoneNumber}?text=Olá, estou entrando em contato pelo site!`} className={styles.whatsapp} title="Whatsapp"><i className="fa fa-whatsapp" aria-hidden="true"></i></a>
                <a href="https://dribbble.com/" className={styles.dribbble} title="Nosso Dribbble"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                <a href="https://vimeo.com/pt-br/" className={styles.vimeo} title="Nosso Vimeo"><i className="fa fa-vimeo" aria-hidden="true"></i></a>
                <a href="https://br.pinterest.com/" className={styles.pinterest} title="Nosso Pinterest"><i className="fa fa-pinterest-p" aria-hidden="true"></i></a>
                <a href="https://www.instagram.com" className={styles.insta} title="Nosso Instagram"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="https://www.linkedin.com" className={styles.in} title="Nosso Linked In"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
            </div>
        </div>
    )
}