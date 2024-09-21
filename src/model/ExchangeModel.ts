export default interface ExchangeModel {
    id?: number;
    currency_id?: number;
    exchangeDate?: string;
    exchange_date?: string;
    exchange_rate?: number;
    currencyCode?: string;
    CreatedById?: number;
    UpdatedById?: number;
}

export const listExchangeValue: ExchangeModel = {
    exchangeDate: "",
    currencyCode: "",
    id: 0,
    CreatedById: 0,
    UpdatedById: 0,
    currency_id: 0,
    exchange_date: new Date().toISOString(),
    exchange_rate: 0
}