export default interface CurrencyModel {
    CurrencyID: number;
    code: string;
    DesignationLao: string;
    DesignationEng: string;
    is_pivot: boolean;
    is_swapped: boolean;
    use_cents: boolean;
}

export const listCurrencyValue:CurrencyModel = {
    CurrencyID: 0,
    DesignationEng: "",
    DesignationLao: "",
    code: "",
    is_pivot: false,
    is_swapped: false,
    use_cents: false

}