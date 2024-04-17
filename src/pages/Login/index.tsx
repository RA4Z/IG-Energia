import { login } from 'services/auth';
import styles from './Login.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from 'config/supabase';
import Loading from 'components/Loading';

export default function Login() {
    const [logar, setLogar] = useState({ email: '', senha: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function getUserLogged() {
            const user = (await supabase.auth.getUser()).data.user?.email
            if (user !== undefined) {
                if (user === 'rvtech@tech.com') {
                    navigate('/Admin')
                } else {
                    navigate('/')
                }
            }
        }
        getUserLogged()
    }, [navigate])

    function addRightPanel() {
        document.getElementById('container')?.classList.add(styles.right_panel_active);
    }
    function removeRightPanel() {
        document.getElementById('container')?.classList.remove(styles.right_panel_active);
    }

    async function userLogin() {
        setLoading(true)
        const result = await login(logar.email, logar.senha)
        setLoading(false)
        if (result === 'rvtech@tech.com') {
            navigate('/Admin')
        } else if (result === 'error') {
            alert('E-mail ou senha incorretos!')
        } else {
            navigate('/')
        }
    }

    return (
        <div className={styles.main_container}>
            <Loading open={loading} />
            <div className={styles.container} id="container">
                <div className={styles.sign_up_container}>
                    <div className={styles.formulario}>
                        <h1>Criação de Conta</h1>
                        <input type="text" placeholder="Nome" />
                        <input type="email" placeholder="E-mail" />
                        <input type="password" placeholder="Senha" />
                        <button>Fazer Cadastro</button>
                    </div>
                </div>
                <div className={styles.sign_in_container}>
                    <div className={styles.formulario}>
                        <h1>Fazer Login</h1>

                        <input value={logar.email}
                            onChange={e => setLogar({ ...logar, email: e.target.value })}
                            type="email" placeholder="E-mail" />

                        <input value={logar.senha}
                            onChange={e => setLogar({ ...logar, senha: e.target.value })}
                            type="password" placeholder="Senha" />

                        <a href="/">Esqueceu sua senha?</a>
                        <button onClick={() => userLogin()}>Fazer Login</button>
                    </div>
                </div>
                <div className={styles.overlay_container}>
                    <div className={styles.overlay}>
                        <div className={styles.overlay_left}>
                            <h1>Bem-vindo de volta!</h1>
                            <p>Para se manter conectado conosco por favor faça o Login com suas informações pessoais</p>
                            <button className={styles.ghost} onClick={() => removeRightPanel()}>Fazer Login</button>
                        </div>
                        <div className={styles.overlay_right}>
                            <h1>Olá, amigo!</h1>
                            <p>Entre com seus detalhes pessoais e comece sua jornada conosco!</p>
                            <button className={styles.ghost} onClick={() => addRightPanel()}>Cadastre-se</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}