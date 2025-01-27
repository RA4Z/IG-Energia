import { auth } from "config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function login(email: string, password: string) {
    const resultado = await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            return "sucesso"
        })
        .catch(() => {
            return "erro"
        });
    return resultado;
}