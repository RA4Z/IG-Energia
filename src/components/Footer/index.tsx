import { Divider } from '@mui/material'
import styles from './Footer.module.scss'
import Logo from 'assets/logo.svg'

import whatsapp from 'assets/whatsapp.svg'
import facebook from 'assets/facebook.svg'
import instagram from 'assets/instagram.svg'
import linkedin from 'assets/linkedin.svg'

import { logoff } from 'services/auth'
import { useNavigate } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'
import { supabase } from 'config/supabase'
import BotaoHover from 'components/BotaoHover'
import Maps from 'components/Maps'
import { phoneNumber } from 'types/database'

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

    async function logout() {
        await logoff()
        setUser('')
        navigate('/Login')
        window.location.reload()
    }
    return (
        <>
            <div className={styles.container}>
                <div>
                    <img src={Logo} alt='Logotipo' className={styles.container__logotipo} />
                </div>

                <div className={styles.container__dev}>
                    {user !== '' && <BotaoHover text='Deslogar' onClick={() => logout()} />}

                    <button className={styles.container__button}>Default Webpage</button>
                    <Divider style={{ background: 'white' }} />
                    <div className={styles.container__icos}>
                        <a href='https://www.facebook.com'><img src={facebook} alt='Facebook' title='Nosso Facebook' className={styles.container__icos__icon} /></a>
                        <a href={`https://wa.me/${phoneNumber}?text=Olá, estou entrando em contato pelo site!`} target='_blank' rel="noreferrer"><img src={whatsapp} alt='Whatsapp' title='Nosso Whatsapp' className={styles.container__icos__icon} /></a>
                        <a href='https://www.instagram.com'><img src={instagram} alt='Instagram' title='Nosso Instagram' className={styles.container__icos__icon} /></a>
                        <a href='https://www.linkedin.com'><img src={linkedin} alt='LinkedIn' title='Nosso LinkedIn' className={styles.container__icos__icon} /></a>
                    </div>
                </div>

                <div className={styles.atribuicoes}>
                    <div className={styles.atribuicoes__maps}>
                        <Maps />
                    </div>
                    <li>Schroeder, Santa Catarina, Brasil</li>
                    <li>Rua Marechal Castelo Branco</li>
                    <li>4456, Centro Norte, CEP 89275-000</li>
                    <li>Ícones projetados por UIcons da Flaticon</li>
                </div>
            </div>
            <div className={styles.creditos}><p>Default Webpage, projeto prototipado e desenvolvido por RV Tech rvtechny@gmail.com</p></div>
        </>
    )
}
export default memo(Footer)