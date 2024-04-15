import { supabase } from "config/supabase";
import { ItensType } from "types/sistema";

export async function getData(database: string, setDados: any, setBackup: any) {
    let { data: dados, error } = await supabase
        .from(database)
        .select('*')
    if (error) {
        return error;
    }
    setDados(dados)
    setBackup(dados)
    return dados;
}

export async function insertData(database: string, data: ItensType) {
    const { error } = await supabase
        .from(database)
        .insert([data])
        .select()
    if (error) return error
    return 'success'
}

