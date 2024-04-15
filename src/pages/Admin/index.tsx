import { supabase } from "config/supabase"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InputBox from "components/InputBox"

import styles from './Admin.module.scss'
import { getData } from "services/table"
import BotaoHover from "components/BotaoHover"
import { insertData } from "services/table"
import { algumCampoVazio } from "utils"
import { ItensType } from "types/sistema"

export default function Admin() {
    const navigate = useNavigate()
    const [data, setData] = useState<ItensType | null>(null)
    const [dados, setDados] = useState<ItensType[]>([])
    const [backup, setBackup] = useState<ItensType[]>([])

    useEffect(() => {
        async function getUserLogged() {
            const user = (await supabase.auth.getUser()).data.user?.email
            if (user === undefined) {
                navigate('/Login')
            } else {
                await getData('Itens', setDados, setBackup)
            }
        }
        getUserLogged()
    }, [navigate])

    async function cadastrar() {
        if (data === null) return
        if (algumCampoVazio(data)) return alert('Por favor, preencha todos os campos antes de realizar o cadastro.');

        const result = await insertData('Itens', data)
        if (result === 'success') {
            alert('Cadastrado com sucesso!')
            setData(null)
        } else {
            alert(`Ocorreu o erro ${result}!`)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Janela de Administração</h1>
            <div className={styles.form}>
                {data !== null && Object.entries(data).map(([field, value]) => (
                    <InputBox label={field}
                        texto={value} onChange={e => setData({ ...data, [field]: e.target.value })} />
                ))}
            </div>
            <BotaoHover text="Realizar Cadastro" onClick={() => cadastrar()} />
        </div>
    )
}