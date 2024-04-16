export function algumCampoVazio(data: any) {
    const algumCampoVazio = Object.entries(data)
        .filter(([fieldName, value]) => (value === "" && fieldName !== 'id'))
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