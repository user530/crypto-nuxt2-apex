import { CurrencyPairs } from './currencyPairs';
import { TimeIntervals } from './timeIntervals';

export interface IRequestFormData {
    symbol: CurrencyPairs,
    interval: TimeIntervals,
    start_date: string,
    end_date: string,
};