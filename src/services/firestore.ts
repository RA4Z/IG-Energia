import { logEvent } from "firebase/analytics"
import { doc, setDoc } from "firebase/firestore"
import { analytics, db } from '../config/firebase';

export async function cadastrarInfoUser(data: any, id: any) {
    try {
        await setDoc(doc(db, `usuarios`, id), data)
        logEvent(analytics, 'cadastro_usuario')
        return 'sucesso'
    } catch (error) {
        return error
    }
}