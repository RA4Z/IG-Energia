import { supabase } from "config/supabase"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InputBox from "components/InputBox"

import styles from './Admin.module.scss'
import { getData } from "services/table"
import BotaoHover from "components/BotaoHover"
import { insertData } from "services/table"
import { algumCampoVazio } from "utils"
import { ItensDefault, ItensType } from "types/sistema"
import ImportImage from "components/ImportImage"

export default function Admin() {
    const navigate = useNavigate()
    const [data, setData] = useState<ItensType>(ItensDefault)
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
        console.log(data)
        if (algumCampoVazio(data)) return alert('Por favor, preencha todos os campos antes de realizar o cadastro.');

        const result = await insertData('Itens', data)
        if (result === 'success') {
            alert('Cadastrado com sucesso!')
            setData(ItensDefault)
        } else {
            alert(`Ocorreu o erro ${result}!`)
        }
    }

    return (
        <div className={styles.container}>
            <h1>Janela de Administração</h1>
            <div className={styles.form}>
                {data !== null && Object.entries(data).map(([field, value]) => (
                    (field !== 'id' && field !== 'image') &&
                    <InputBox label={field} key={field}
                        texto={value} onChange={e => setData({ ...data, [field]: e.target.value })} />
                ))}
            </div>
            <BotaoHover text="Realizar Cadastro" onClick={() => cadastrar()} />
            <div className={styles.lista}>
                {dados.map(dado => (
                    <div className={styles.lista__card} key={dado.title}>
                        <div className={styles.lista__card__header}>
                            <h1>{dado.title}</h1>
                            <ImportImage data={dado} />
                        </div>
                        <img src={dado.image} alt={dado.title} />
                        <h3>{dado.category}</h3>
                        <h3>{dado.information}</h3>
                        <h3>{dado.unityValue}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}