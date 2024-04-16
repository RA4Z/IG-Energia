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
        .insert([{ ...data, id: undefined }])
        .select()
    if (error) return error
    return 'success'
}

export async function insertImage(file: any, filename: string) {
    const { error } = await supabase
        .storage
        .from('images')
        .upload(`/Products/${filename}`, file, {
            cacheControl: '3600', // Set cache expiration (optional)
            upsert: true, // Overwrite existing file with same name (optional)
        });

    if (error) {
        console.error('Upload error:', error); // Log the error for debugging
        return Promise.reject(error); // Reject the promise with the error
    }
    return `https://eljilalbzabmkahtvfkv.supabase.co/storage/v1/object/public/images/Products/${filename}`
}
