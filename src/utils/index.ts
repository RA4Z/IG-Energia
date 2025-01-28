import { auth } from "config/firebase";

export function algumCampoVazio(data: any) {
    const algumCampoVazio = Object.entries(data)
        .filter(([fieldName, value]) => (value === "" && fieldName !== 'id' && fieldName !== 'image'))
        .length > 0;
    if (algumCampoVazio) return true
}
export const formatoMoneyBR = new Intl.NumberFormat(
    'pt-BR',                         //Configura localização como português do Brasil.
    {
        style: 'currency',             //Configura o estilo de formatação como moeda.
        currency: 'BRL'                //Configura a moeda como Real Brasileiro.
    }
)

//SE USUÁRIO NÃO ESTIVER LOGADO ENTÃO IR PARA A TELA DE LOGIN
export function redirecionarParaLogin() {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged(usuario => {
            unsubscribe(); // Cancela o listener após a primeira verificação
            resolve(!usuario); // Resolve a Promise com true se não houver usuário, false caso contrário
        });
    });
}