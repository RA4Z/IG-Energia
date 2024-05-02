import { Divider } from '@mui/material'
import styles from './Footer.module.scss'
import Logo from 'assets/logo.svg'
import { logoff } from 'services/auth'
import { useNavigate } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'
import { supabase } from 'config/supabase'
import BotaoMain from 'components/BotaoMain'
import Maps from 'components/Maps'
import Social from './Social'

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
                    {user !== '' && <BotaoMain text='Deslogar' onClick={() => logout()} />}

                    <button className={styles.container__button}>Default Webpage</button>
                    <Divider style={{ background: 'white' }} />
                    <div className={styles.container__icos}>
                        <Social />
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