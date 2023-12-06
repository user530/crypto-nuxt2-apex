export interface TwelveDataAPI {
    meta: {
        symbol: string,
        interval: string,
        currency_base: string,
        currency_quote: string,
        exchange: string,
        type: string
    },
    values:
    {
        datetime: string,
        open: string,
        high: string,
        low: string,
        close: string
    }[]
};