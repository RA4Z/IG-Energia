import { Divider } from '@mui/material'
import styles from './Footer.module.scss'
import Logo from 'assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'
import { supabase } from 'config/supabase'
import BotaoMain from 'components/BotaoMain'
import Maps from 'components/Maps'
import Social from './Social'

import { auth } from 'config/firebase';
import { signOut } from 'firebase/auth';

function Footer() {
    const navigate = useNavigate()
    const [user, setUser] = useState('')

    useEffect(() => {
        async function getUserLogged() {
            const user = (await supabase.auth.getUser()).data.user?.email
            if (user !== '' && user !== undefined) {
                setUser(user)
            }
        }
        getUserLogged()
    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login");
            window.location.reload()
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <>
            <div className={styles.container}>
                <div>
                    <img src={Logo} alt='Logotipo' className={styles.container__logotipo} />
                </div>

                <div className={styles.container__dev}>
                    {user !== '' && <BotaoMain text='Deslogar' onClick={() => handleLogout()} />}

                    <button className={styles.container__button}>IG Energia</button>
                    <Divider style={{ background: 'white' }} />
                    <div className={styles.container__icos}>
                        <Social />
                    </div>
                </div>

                <div className={styles.atribuicoes}>
                    <div className={styles.atribuicoes__maps}>
                        <Maps />
                    </div>
                    <li>Jaraguá do Sul, Santa Catarina, Brasil</li>
                    <li>Rua João Januário Ayroso</li>
                    <li>4456, Centro Norte, CEP 89253-100</li>
                    <li>Ícones projetados por UIcons da Flaticon</li>
                </div>
            </div>
            <div className={styles.creditos}><p>IG Energia, projeto prototipado e desenvolvido por Robert Aron Zimmermann robertz.raz@gmail.com</p></div>
        </>
    )
}
export default memo(Footer)