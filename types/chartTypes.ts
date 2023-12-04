export interface ApexCandlesSeries {
    name: string,
    data: CandlePrice[],
}

interface CandlePrice {
    x: Date,
    y: [number, number, number, number],
}