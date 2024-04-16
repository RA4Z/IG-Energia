export interface CarrinhoType {
    id: any,
    image: string,
    title: string,
    quantity: number,
    unityValue: number,
    value: number,
}

export const ItensDefault = {
    id: '',
    title: '',
    image: '',
    category: '',
    information: '',
    unityValue: 0,
}

export interface ItensType {
    id: any,
    title: string,
    image: string,
    category: string,
    information: string,
    unityValue: number,
}