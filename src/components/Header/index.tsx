import styles from './Header.module.scss'
import Logotipo from 'assets/logo.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import Hamburguer from './Hamburguer';
import { memo, useEffect, useState } from 'react';
import { supabase } from 'config/supabase';
import { admMail } from 'types/database';

function Header() {
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        async function getUserLogged() {
            const user = (await supabase.auth.getUser()).data.user?.email
            if (user !== '' && user !== undefined) {
                setUser(user)
            }
        }
        getUserLogged()
    }, [])

    function navigateHome() {
        if (location.pathname !== '/') navigate('/')
    }

    function travelTo(pagina: string) {
        if (location.pathname.toLowerCase() !== pagina.toLowerCase()) navigate(pagina)
    }

    return (
        <nav className={styles.container}>
            <button onClick={() => navigateHome()} title='Navegar para a Homepage'>
                <img src={Logotipo} alt='Logo da Weg' />
            </button>

            <ul>
                <div className={styles.hamburguer}><Hamburguer user={user} /></div>
                {user === admMail && <li><button className={location.pathname.toLowerCase() === '/admin' ? styles.buttonBlock : styles.buttonNav} onClick={() => travelTo('/admin')}>Admin</button></li>}
                <li><button className={location.pathname.toLowerCase() === '/' ? styles.buttonBlock : styles.buttonNav} onClick={() => travelTo('/')}>Home</button></li>
                <li><button className={location.pathname.toLowerCase() === '/catalogo' ? styles.buttonBlock : styles.buttonNav} onClick={() => travelTo('/Catalogo')}>Catálogo</button></li>
                <li><button className={location.pathname.toLowerCase() === '/carrinho' ? styles.buttonBlock : styles.buttonNav} onClick={() => travelTo('/Carrinho')}>Carrinho</button></li>
                <li><button className={location.pathname.toLowerCase() === '/sobre' ? styles.buttonBlock : styles.buttonNav} onClick={() => travelTo('/Sobre')}>Sobre nós</button></li>
            </ul>
        </nav>
    )
}
export default memo(Header)